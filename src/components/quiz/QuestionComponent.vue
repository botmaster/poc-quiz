<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/components/shared/AppButton.vue';
import TimerComponent from '@/components/quiz/TimerComponent.vue';
import type { Question } from '@/types/quiz';

interface Props {
  question: Question
  timeout?: number | boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'answerPicked': [question: Question, answerId: number]
  'noAnswerPicked': [question: Question, answerId: number | null]
}>();
const isTimeout = ref(false);

const selectedAnswerId = ref<number | null>(null);

function noAnswerPicked() {
  emit('noAnswerPicked', props.question, null);
}

function answerPicked(answerId: number) {
  emit('answerPicked', props.question, answerId);
}

function notifyAboutTimeout() {
  isTimeout.value = true;
}

function submitHandler() {
  if (selectedAnswerId.value)
    answerPicked(selectedAnswerId.value);
  else
    noAnswerPicked();
}
</script>

<template>
  <div>
    <TimerComponent v-if="timeout || typeof timeout === 'number'" :duration="typeof timeout === 'number' ? timeout : undefined" @timeout-notifying="notifyAboutTimeout" @count-finished="noAnswerPicked" />
    <div v-if="!isTimeout" class="">
      <h2 class="text-4xl">
        {{ props.question.body }}
      </h2>
      <form @submit.prevent="submitHandler">
        <ul class="mt-8">
          <li v-for="answer of props.question.answers" :key="answer.id" class="flex gap-2 items-center">
            <input :id="`radio_${answer.id}`" v-model.number="selectedAnswerId" name="answers" type="radio" :value="answer.id">
            <label :for="`radio_${answer.id}`">{{ answer.body }}</label>
          </li>
        </ul>
        <div class="mt-4 flex gap-2">
          <AppButton type="submit" :disabled="!selectedAnswerId" color-variant="primary" size="lg">
            answer
          </AppButton>
          <AppButton color-variant="primary" size="lg" @click="noAnswerPicked">
            skip
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
