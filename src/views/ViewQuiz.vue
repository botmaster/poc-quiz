<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import AppContainer from '@/components/layout/AppContainer.vue';
import QuestionComponent from '@/components/quiz/QuestionComponent.vue';

import { useQuizStore } from '@/stores/quizStore';
import AppButton from '@/components/shared/AppButton.vue';
import type { Question } from '@/types/quiz';

const quizStore = useQuizStore();

const currentScreen = ref<'welcome' | 'questions' | 'results'>('welcome');

function questionEventHandler(question: Question, answerId?: number, timeSpent?: number) {
  if (!answerId)
    quizStore.addUserAnswer(question, -1);
  else
    quizStore.addUserAnswer(question, answerId, timeSpent);

  quizStore.goToNextQuestion();
}

function startQuiz() {
  currentScreen.value = 'questions';
  quizStore.start();
}

function restartQuiz() {
  currentScreen.value = 'welcome';
  quizStore.restartQuiz();
}

onUnmounted(() => {
  quizStore.reset();
});

watch(() => quizStore.quizFinished, (newValue) => {
  if (newValue)
    currentScreen.value = 'results';
});
</script>

<template>
  <div class="mt-8 lg:mt-14 mb-10 lg:mb-16">
    <AppContainer>
      <h2 class="heading-2 mb-8">
        {{ quizStore.quiz.name }}
      </h2>
      <Transition name="fade" mode="out-in">
        <div v-if="currentScreen === 'welcome'">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse expedita facere magnam numquam omnis
            totam. Assumenda commodi, corporis doloremque ipsam optio provident quidem. Ad doloremque minima molestiae rem
            sit?
          </p>
          <p class="mt-24">
            <AppButton color-variant="primary" size="lg" @click="startQuiz">
              start quiz
            </AppButton>
          </p>
        </div>
        <div v-else-if="currentScreen === 'questions'">
          <h3 class="heading-3 mb-8">
            Question {{ quizStore.currentQuestionIndex + 1 }}<span class="heading-6">/{{ quizStore.quiz.items.length
            }}</span>
          </h3>
          <TransitionGroup tag="div" name="list" style="position: relative;">
            <template v-for="question of quizStore.quiz.items">
              <QuestionComponent
                v-if="question.id === quizStore.currentQuestionId"
                :key="question.id" :question="question" :timeout="true"
                @answer-picked="questionEventHandler" @no-answer-picked="questionEventHandler"
              />
            </template>
          </TransitionGroup>
        </div>
        <div v-else-if="currentScreen === 'results'" class="mt-4">
          <p class="heading-3">
            <span>Finished</span>
          </p>
          <p class=" mt-2">
            score: {{ quizStore.score }} / 5
          </p>
          <p v-if="quizStore.averageTimeSpentByQuestion">
            Average time spent by question: {{ (quizStore.averageTimeSpentByQuestion / 1000).toFixed(1) }}s
          </p>

          <ul class="mt-8 space-y-4">
            <li v-for="(row, index) in quizStore.answerList" :key="index">
              <p class="font-bold">
                {{ index + 1 }} - {{ row.body }} <span v-if="row.answerIsRight" class="text-success">
                  <Icon icon="material-symbols:check-circle" :inline="true" />
                </span><span v-else class="text-danger">
                  <Icon icon="material-symbols:cancel" inline />
                </span>
              </p>
              <p>User answer: {{ row.userAnswer.body }}</p>
              <p v-if="row.timeSpent">
                Time spent: {{ (row.timeSpent / 1000).toFixed(1) }}s
              </p>
              <p v-if="!row.answerIsRight">
                <span>Right answer is </span> <span class="font-bold">{{ row.rightAnswer.body }}</span>
              </p>
            </li>
          </ul>

          <div class="mt-4">
            <AppButton color-variant="primary" size="lg" @click="restartQuiz">
              restart quiz
            </AppButton>
          </div>
        </div>
      </Transition>
    </AppContainer>
  </div>
</template>

<style scoped lang="scss">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
