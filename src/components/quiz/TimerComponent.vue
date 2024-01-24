<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import useCountdownTimer from '@/composables/useCountdownTimer';

const props = withDefaults(defineProps<{
  duration: number
  autoPlay?: boolean
}>(), {
  duration: 15,
  autoPlay: false,
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
  }, 3000);
}

onMounted(() => {
  if (props.autoPlay)
    startTimer();
});

defineExpose({
  startTimer,
});
</script>

<template>
  <div class="flex gap-3">
    <p class="font-mono text-3xl">
      <span>{{ leftLikeObject.seconds?.toFixed(0).padStart(2,'0') }}<span class="text-sm">s</span> {{
        leftLikeObject.milliseconds?.toFixed(0).padStart(3, '0') }}</span><span class="text-xs">ms</span>
    </p>
    <p class="text-3xl">
      <span v-if="timeOut">Time out! </span>
    </p>
  </div>
</template>

<style lang="scss"></style>
