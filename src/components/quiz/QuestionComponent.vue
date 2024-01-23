<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AppButton from '@/components/shared/AppButton.vue';
import TimerComponent from '@/components/quiz/TimerComponent.vue';
import type { Question } from '@/types/quiz';
import useStopWatch from '@/composables/useStopWatch';

interface Props {
  question: Question
  timeout?: number | boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'answerPicked': [question: Question, answerId: number, timeSpent: number]
  'noAnswerPicked': [question: Question]
}>();
const isTimeout = ref(false);

const selectedAnswerId = ref<number | null>(null);

const { elapsed, play, pause, reset } = useStopWatch({ duration: 10000 });

// Computed - duration
const duration = computed<number | undefined>(() => {
  if (typeof props.timeout === 'number')
    return props.timeout;
  else if (props.question.duration)
    return props.question.duration;
  return undefined;
});

function noAnswerPicked() {
  emit('noAnswerPicked', props.question);
}

function answerPicked(answerId: number, timeSpent: number) {
  emit('answerPicked', props.question, answerId, Math.round(timeSpent));
}

function questionTimeoutHandler() {
  isTimeout.value = true;
}

function questionIsOverHandler() {
  submitHandler();
}

function cancelHandler() {
  reset();
  noAnswerPicked();
}

function submitHandler() {
  pause();
  if (selectedAnswerId.value)
    answerPicked(selectedAnswerId.value, elapsed.value);
  else
    noAnswerPicked();
}

onMounted(() => {
  play();
});
</script>

<template>
  <div>
    <p>{{ elapsed }}</p>
    <TimerComponent v-if="timeout || typeof timeout === 'number'" :duration="duration" @question-timeout="questionTimeoutHandler" @question-is-over="questionIsOverHandler" />
    <div v-if="!isTimeout" class="">
      <h2 class="text-4xl">
        {{ props.question.body }}
      </h2>
      <form action="" @submit.prevent="submitHandler">
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
          <AppButton type="submit" color-variant="ghost" size="lg" @click.prevent="cancelHandler">
            skip
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
