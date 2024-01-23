<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import AppContainer from '@/components/layout/AppContainer.vue';
import QuestionComponent from '@/components/quiz/QuestionComponent.vue';

import { useQuizStore } from '@/stores/quizStore';
import AppButton from '@/components/shared/AppButton.vue';
import type { Question } from '@/types/quiz';
import useStopWatch from '@/composables/useStopWatch';

const { elapsed, play } = useStopWatch({ duration: 10000 });

const quizStore = useQuizStore();

onMounted(() => {
  quizStore.paginate();
  play();
});

function questionEventHandler(question: Question, answerId?: number, timeSpent?: number) {
  if (!answerId)
    quizStore.addUserAnswer(question, -1);
  else
    quizStore.addUserAnswer(question, answerId, timeSpent);

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
        {{ quizStore.quiz.name }}
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse expedita facere magnam numquam omnis
        totam. Assumenda commodi, corporis doloremque ipsam optio provident quidem. Ad doloremque minima molestiae rem
        sit?
      </p>
      <p>{{ elapsed }}</p>
      <div v-if="quizStore.quizFinished" class="mt-4">
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
              {{ index + 1 }} - {{ row.body }} <span v-if="row.answerIsRight" class="text-success"><Icon
                icon="material-symbols:check-circle" :inline="true"
              /></span><span v-else class="text-danger"><Icon
                icon="material-symbols:cancel" inline
              /></span>
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
          <AppButton color-variant="primary" size="lg" @click="quizStore.restartQuiz">
            restart quiz
          </AppButton>
        </div>
      </div>
      <div v-else>
        <template v-for="question of quizStore.quiz.items" :key="question.id">
          <QuestionComponent
            v-if="question.id === quizStore.currentQuestionId"
            :question="question"
            :timeout="true"
            @answer-picked="questionEventHandler"
            @no-answer-picked="questionEventHandler"
          />
        </template>
      </div>
    </AppContainer>
  </div>
</template>

<style scoped lang="scss">

</style>
