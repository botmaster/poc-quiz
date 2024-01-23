<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';

const props = withDefaults(defineProps<{
  duration: number
}>(), {
  duration: 15,
});

const emit = defineEmits<{
  (e: 'questionIsOver'): void
  (e: 'questionTimeout'): void
}>();

const timerInterval = ref<ReturnType<typeof setTimeout> | null>(null);
const currentSecound = ref(props.duration);
const preciseTime = ref(0);
const timeOut = ref(false);

let startTime: number;

function startTimer() {
  startTime = performance.now();
  timerInterval.value = setTimeout(checkTime, 1000);
}

function checkTime() {
  const elapsed = performance.now() - startTime;
  const seconds = Math.floor(elapsed / 1000);
  preciseTime.value = elapsed;

  if (seconds >= props.duration) {
    timeOut.value = true;
    emit('questionTimeout');
    finishing();
  }
  else {
    currentSecound.value = props.duration - seconds;
    timerInterval.value = setTimeout(checkTime, 1000);
  }
}

function finishing() {
  setTimeout(() => {
    emit('questionIsOver');
  }, 2000);
}

provide('currentSecound', currentSecound);
provide('preciseTime', preciseTime);

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timerInterval.value)
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
  </div>
</template>

<style lang="scss"></style>
