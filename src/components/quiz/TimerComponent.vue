<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import useCountdownTimer from '@/composables/useCountdownTimer';

const props = withDefaults(defineProps<{
  duration: number
}>(), {
  duration: 15,
});

const emit = defineEmits<{
  (e: 'questionIsOver'): void
  (e: 'questionTimeout'): void
}>();

const timeOut = ref(false);

const { duration, left, pause, play } = useCountdownTimer({
  duration: props.duration * 1000,
});

function startTimer() {
  play();
}

watch(left, (value) => {
  if (value <= 0) {
    timeOut.value = true;
    emit('questionTimeout');
    finishing();
  }
});

function finishing() {
  setTimeout(() => {
    emit('questionIsOver');
  }, 2000);
}

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div class="">
    <p>
      duration: {{ duration }}
    </p>
    <p>
      left: {{ left / 1000 }}
    </p>
    <p v-if="timeOut">
      time out !!!
    </p>
  </div>
</template>

<style lang="scss"></style>
