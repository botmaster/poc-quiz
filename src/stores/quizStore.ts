import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Answer, Question, QuestionWithUserAnswer, Quiz } from '@/types/quiz';
import data from '@/assets/data/quiz.json';

const questionsCount = data.questionCount || 10;
const questions = data.questions as Question[];

export const useQuizStore = defineStore('quiz', () => {
  const version = ref(data.version || 1);
  const currentQuestionIndex = ref(0);
  const currentQuestionId = ref<number | null>(null);
  const answerList = ref<QuestionWithUserAnswer[]>([]);
  const quizFinished = ref(false);
  const score = ref(0);

  const quiz = computed<Quiz>(() => {
    const max = questions.length - 1;
    const min = 0;
    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < questionsCount) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNumber);
    }

    const questionsCollection = [...uniqueNumbers].map(index => questions[index]);

    return {
      name: data.name || 'Quiz',
      version: version.value,
      items: questionsCollection,
    };
  });

  const currentQuestion = computed<Question | undefined>(() => {
    return quiz.value.items.filter(question => question.id === currentQuestionId.value)[0];
  });

  const averageTimeSpentByQuestion = computed<number>(() => {
    return answerList.value.reduce((acc, answer) => {
      return acc + (answer.timeSpent || 0);
    }, 0) / answerList.value.length;
  });

  const getAnswerById = (answers: Answer[], id: number): Answer => {
    return answers.find(answer => answer.id === id) ?? { body: 'no answer', id: -1 };
  };

  const addUserAnswer = (question: Question, answerId: number = -1, timeSpent?: number) => {
    const { rightAnswerId, answers } = question;
    const answerIsRight = rightAnswerId === answerId;

    if (answerIsRight)
      score.value += 1;

    const userAnswer = getAnswerById(answers, answerId);
    const rightAnswer = getAnswerById(answers, rightAnswerId);

    answerList.value = [...answerList.value, {
      ...question,
      userAnswer,
      answerIsRight,
      rightAnswer,
      timeSpent,
    }];
  };

  // Start the Quiz. If it was already started, do nothing.
  const start = () => {
    if (currentQuestionId.value)
      return;
    currentQuestionId.value = quiz.value.items[currentQuestionIndex.value].id;
  };

  // Go to the next question. If it was already the last question, finish the Quiz.
  const goToNextQuestion = () => {
    if (currentQuestionIndex.value === quiz.value.items.length - 1)
      return quizFinished.value = true;
    currentQuestionIndex.value += 1;
    currentQuestionId.value = quiz.value.items[currentQuestionIndex.value].id;
  };

  const reset = () => {
    currentQuestionIndex.value = 0;
    currentQuestionId.value = null;
    quizFinished.value = false;
    answerList.value = [];
    score.value = 0;
  };

  const restartQuiz = () => {
    reset();
    version.value += 1;
    start();
  };

  return {
    questions,
    quizFinished,
    quiz,
    currentQuestionId,
    currentQuestionIndex,
    currentQuestion,
    averageTimeSpentByQuestion,
    answerList,
    score,
    start,
    goToNextQuestion,
    restartQuiz,
    addUserAnswer,
    reset,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore as any, import.meta.hot));
