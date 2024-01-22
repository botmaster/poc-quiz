<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(defineProps<{
  duration: number
}>(), {
  duration: 6,
});

const emit = defineEmits<{
  (e: 'countFinished'): void
  (e: 'timeoutNotification'): void
}>();

const timerInterval = ref<ReturnType<typeof setTimeout> | null>(null);
const questionDurationProgress = ref(0);
const currentSecound = ref(0);
const timeOut = ref(false);

function startTimer() {
  timerInterval.value = setInterval(() => {
    currentSecound.value += 1;
    questionDurationProgress.value = (currentSecound.value / (props.duration - 1)) * 100;
    if (currentSecound.value === props.duration) {
      clearInterval(Number(timerInterval.value));
      timeOut.value = true;
      emit('timeoutNotification');
      finishing();
    }
  }, 1000);
}

function finishing() {
  setTimeout(() => {
    emit('countFinished');
  }, 2000);
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(Number(timerInterval.value));
});
</script>

<template>
  <div class="">
    <p class="text-3xl font-display">
      {{ currentSecound }}
    </p>
    <p v-if="timeOut">
      time out !!!
    </p>
    <p>progress: {{ questionDurationProgress }}</p>
  </div>
</template>

<style lang="scss"></style>
