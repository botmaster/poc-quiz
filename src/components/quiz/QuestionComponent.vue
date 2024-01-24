<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AppButton from '@/components/shared/AppButton.vue';
import TimerComponent from '@/components/quiz/TimerComponent.vue';
import type { Question } from '@/types/quiz';
import useTimer from '@/composables/useTimer';

interface Props {
  question: Question
  timeout?: number | boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'answerPicked': [question: Question, answerId: number, timeSpent: number]
  'noAnswerPicked': [question: Question]
}>();

const startDelay = 500;

const isStarted = ref(false);
const isTimeout = ref(false);
const selectedAnswerId = ref<number | null>(null);
const timerRef = ref<typeof TimerComponent>();

// Duration in seconds
const duration = computed<number | undefined>(() => {
  if (typeof props.timeout === 'number')
    return props.timeout;
  else if (props.question.duration)
    return props.question.duration;
  return undefined;
});

const { elapsed, play, pause, reset } = useTimer({ duration: duration.value ? duration.value * 1000 : undefined });

function noAnswerPicked() {
  emit('noAnswerPicked', props.question);
}

function answerPicked(answerId: number, timeSpent: number) {
  emit('answerPicked', props.question, answerId, Math.round(timeSpent));
}

function questionTimeoutHandler() {
  isTimeout.value = true;
  isStarted.value = false;
}

function questionIsOverHandler() {
  submitHandler();
}

function cancelHandler() {
  isStarted.value = false;
  reset();
  noAnswerPicked();
}

function submitHandler() {
  isStarted.value = false;
  pause();
  if (selectedAnswerId.value)
    answerPicked(selectedAnswerId.value, elapsed.value);
  else
    noAnswerPicked();
}

onMounted(() => {
  setTimeout(() => {
    isStarted.value = true;
    play();
    timerRef.value?.startTimer();
  }, startDelay);
});
</script>

<template>
  <div>
    <TimerComponent class="mb-4" v-if="timeout || typeof timeout === 'number'" ref="timerRef" :duration="duration" @question-timeout="questionTimeoutHandler" @question-is-over="questionIsOverHandler" />
    <div class="">
      <p class="text-6xl">
        {{ props.question.body }}
      </p>
      <form action="" @submit.prevent="submitHandler">
        <ul class="mt-6 space-y-2">
          <li v-for="answer of props.question.answers" :key="answer.id" class="flex gap-2 items-center">
            <input :id="`radio_${answer.id}`" v-model.number="selectedAnswerId" :disabled="isTimeout || !isStarted" name="answers" type="radio" :value="answer.id">
            <label :for="`radio_${answer.id}`">{{ answer.body }}</label>
          </li>
        </ul>
        <div class="mt-8 flex gap-2">
          <AppButton type="submit" :disabled="!selectedAnswerId" color-variant="primary" size="lg">
            answer
          </AppButton>
          <AppButton :disabled="isTimeout || !isStarted" type="submit" color-variant="ghost" size="lg" @click.prevent="cancelHandler">
            skip
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
