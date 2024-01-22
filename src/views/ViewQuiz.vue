<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AppContainer from '@/components/layout/AppContainer.vue';
import QuestionComponent from '@/components/quiz/QuestionComponent.vue';

import { useQuizStore } from '@/stores/quizStore';
import AppButton from '@/components/shared/AppButton.vue';
import type { Question } from '@/types/quiz';

const quizStore = useQuizStore();

onMounted(() => {
  quizStore.paginate();
});

function loadNextQuestion(question: Question, answerId: number | null) {
  quizStore.updateProgress(question, answerId || -1);
  quizStore.paginate();
}

onUnmounted(() => {
  quizStore.reset();
});
</script>

<template>
  <div class="mt-8 lg:mt-14 mb-10 lg:mb-16">
    <AppContainer>
      <h2 class="heading-2 mb-8">
        Quiz
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse expedita facere magnam numquam omnis totam. Assumenda commodi, corporis doloremque ipsam optio provident quidem. Ad doloremque minima molestiae rem sit?</p>
      <div v-if="quizStore.quizFinished" class="mt-4">
        <h2 class="text-6xl">
          <span>Finished</span>
        </h2>
        <h2 class="text-3xl mt-2">
          <span class="px-2">score: {{ quizStore.score }} / 5</span>
        </h2>
        <div class="mt-4 px-2">
          <ul>
            <li v-for="(row, index) in quizStore.answerList" :key="index" class="mt-8">
              <p class="text-4xl">
                {{ row.body }}
              </p>
              <div class="text-2xl mt-4">
                <p>User answer: {{ row.userAnswer.body }}</p>
                <p v-if="!row.answerIsRight">
                  <span>Right answer is </span> <span class="font-bold">{{ row.rightAnswer.body }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="mt-4">
          <AppButton color-variant="primary" size="lg" @click="quizStore.restartQuiz">
            restart quiz
          </AppButton>
        </div>
      </div>
      <p v-else>
        <template v-for="question of quizStore.quiz.items" :key="question.id">
          <QuestionComponent
            v-if="question.id === quizStore.currentQuestionId"
            :question="question"
            :timeout="true"
            @answer-picked="loadNextQuestion"
            @no-answer-picked="loadNextQuestion"
          />
        </template>
      </p>
    </AppContainer>
  </div>
</template>

<style scoped lang="scss">

</style>
