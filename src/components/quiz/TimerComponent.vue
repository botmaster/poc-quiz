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

const { left, play, leftLikeObject } = useCountdownTimer({
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
    <p class="font-mono text-3xl">
      <span>{{ leftLikeObject.seconds }}<span class="text-sm">s</span> {{
        leftLikeObject.milliseconds?.toFixed(0).padStart(3, '0') }}</span><span class="text-xs">ms</span> <span v-if="timeOut">time out !!!</span>
    </p>
  </div>
</template>

<style lang="scss"></style>
