/**
 * Timer composable
 */

import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { Duration } from 'luxon';

interface CountdownTimerOptions {
  duration: number // in milliseconds
}

export default function useCountdownTimer(options: CountdownTimerOptions) {
  const duration = ref(options.duration);
  const left = ref(duration.value);
  const isRunning = ref(false);

  let startDate: number;
  let handle: number;

  const update = () => {
    left.value = Math.max(0, startDate - Date.now());
    if (left.value <= 0)
      cancelAnimationFrame(handle);
    else
      handle = requestAnimationFrame(update);
  };

  // Reset the CountdownTimer. Stop it and set the left time to the duration.
  const reset = () => {
    if (handle)
      cancelAnimationFrame(handle);
    left.value = duration.value;
    isRunning.value = false;
  };

  // Start the CountdownTimer. If it was already running, do nothing.
  const play = () => {
    if (isRunning.value)
      return;
    isRunning.value = true;
    startDate = Date.now() + left.value;

    if (handle)
      cancelAnimationFrame(handle);
    update();
  };

  // Stop the CountdownTimer. If it was already stopped, do nothing.
  const pause = () => {
    if (!isRunning.value)
      return;
    isRunning.value = false;
    if (handle)
      cancelAnimationFrame(handle);
  };

  /* const time = computed(() => ({
    millisecond: (left.value % 1000).toFixed(0).padStart(3, '0'),
    seconds: Math.floor(left.value / 1000) % 60,
    minutes: Math.floor(left.value / 1000 / 60) % 60,
    hours: Math.floor(left.value / 1000 / 60 / 60) % 24,
    days: Math.floor(left.value / 1000 / 60 / 60 / 24),
  }));
 */

  const leftLikeObject = computed(() => {
    const duration = Duration.fromMillis(left.value);
    return duration.shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
  });

  onMounted(() => {
    reset();
  });

  onUnmounted(() => {
    cancelAnimationFrame(handle);
  });

  return {
    leftLikeObject,
    duration,
    left,
    isRunning,
    play,
    pause,
    reset,
  };
}
