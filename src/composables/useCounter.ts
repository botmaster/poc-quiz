import { computed, onMounted, ref } from 'vue';

export default function useCounter() {
  // Initializing
  // Initialize variables, make API calls, or any setup logic
  // For example, using a router
  // ...

  // Refs
  const count = ref(0);

  // Computed
  const isEven = computed(() => count.value % 2 === 0);

  // Methods
  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  // Lifecycle
  onMounted(() => {
    // eslint-disable-next-line no-console
    console.log('Counter is mounted');
  });

  return {
    count,
    isEven,
    increment,
    decrement,
  };
}
