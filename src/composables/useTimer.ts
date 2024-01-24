/**
 * Timer composable
 */

import { Duration } from 'luxon';
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface TimerOptions {
  duration: number | undefined // in milliseconds
}

export default function useTimer(options: TimerOptions) {
  const durationRef = ref(options.duration);
  const elapsed = ref(0);
  const isRunning = ref(false);

  let lastTime: number;
  let handle: number;

  const update = () => {
    elapsed.value = performance.now() - lastTime;
    if (elapsed.value >= (durationRef.value ?? Number.POSITIVE_INFINITY))
      cancelAnimationFrame(handle);
    else
      handle = requestAnimationFrame(update);
  };

  // Methods

  // Reset the timer. Stop it and set the elapsed time to 0.
  const reset = () => {
    if (handle)
      cancelAnimationFrame(handle);
    elapsed.value = 0;
    isRunning.value = false;
  };

  // Start the timer. If it was already running, do nothing.
  const play = () => {
    if (isRunning.value)
      return;
    isRunning.value = true;
    lastTime = performance.now() - elapsed.value;

    if (handle)
      cancelAnimationFrame(handle);
    handle = requestAnimationFrame(update);
  };

  // Stop the timer. If it was already stopped, do nothing.
  const pause = () => {
    if (!isRunning.value)
      return;
    isRunning.value = false;
    if (handle)
      cancelAnimationFrame(handle);
  };

  onUnmounted(() => {
    cancelAnimationFrame(handle);
  });

  onMounted(() => {
    reset();
  });

  const elapsedLikeObject = computed(() => {
    const duration = Duration.fromMillis(elapsed.value);
    return duration.shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
  });

  return {
    elapsedLikeObject,
    elapsed,
    isRunning,
    reset,
    play,
    pause,
  };
}
