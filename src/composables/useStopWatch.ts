/**
 * StopWatch composable
 * @description
 */

import { onMounted, onUnmounted, ref } from 'vue';

interface StopWatchOptions {
  duration: number
}

export default function useStopWatch(options: StopWatchOptions) {
  const durationRef = ref(options.duration);
  const elapsed = ref(0);
  const isRunning = ref(false);

  let lastTime: number;
  let handle: number;

  const update = () => {
    elapsed.value = performance.now() - lastTime;
    if (elapsed.value >= durationRef.value)
      cancelAnimationFrame(handle);
    else
      handle = requestAnimationFrame(update);
  };

  const reset = () => {
    elapsed.value = 0;
    lastTime = performance.now();
    if (isRunning.value)
      update();
  };

  const play = () => {
    if (!isRunning.value) {
      isRunning.value = true;
      lastTime = performance.now();
      update();
    }
  };

  const pause = () => {
    if (isRunning.value) {
      isRunning.value = false;
      cancelAnimationFrame(handle);
    }
  };

  onUnmounted(() => {
    cancelAnimationFrame(handle);
  });

  onMounted(() => {
    reset();
  });

  return {
    elapsed,
    reset,
    play,
    pause,
  };
}
