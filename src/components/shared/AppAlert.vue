<script setup lang="ts">
import { Icon } from '@iconify/vue';

// Props Interface
import { computed } from 'vue';

// Statuses type
type StatusType = 'success' | 'info' | 'warning' | 'danger' | 'default';

// Pros interface
interface Props {
  status?: StatusType
  closable?: boolean
  title?: string
  description?: string
}

// Props
const props = withDefaults(defineProps<Props>(), {
  status: 'default',
  closable: true,
});

// Emits
const emit = defineEmits<{
  (e: 'close'): void
}>();

// Statuses map
const statuses: Record<StatusType, string> = {
  success: 'alert--is-success',
  info: 'alert--is-info',
  warning: 'alert--is-warning',
  danger: 'alert--is-danger',
  default: 'alert--is-default',
};

// Computed classes
const classes = computed(() => {
  const classes = [];

  if (props.closable)
    classes.push('alert--is-closable');

  classes.push(statuses[props.status]);

  return classes.join(' ');
});

// Computed icon
const icon = computed(() => {
  const icons: Record<StatusType, string> = {
    success: 'heroicons:check-circle-20-solid',
    info: 'heroicons:information-circle-20-solid',
    warning: 'heroicons:exclamation-triangle-20-solid',
    danger: 'heroicons:x-circle-20-solid',
    default: '',
  };

  return icons[props.status];
});
</script>

<template>
  <div class="alert" :class="classes" role="alert">
    <div v-if="props.status && props.status !== 'default'" class="alert__icon">
      <Icon :icon="icon" :inline="false" />
    </div>
    <div class="alert__content">
      <slot>
        <p v-if="props.title" class="alert__title">
          {{ props.title }}
        </p>
        <p v-if="props.description" class="alert__description">
          {{ props.description }}
        </p>
      </slot>
    </div>
    <div v-if="props.closable" class="alert__close">
      <div class="-mx-1.5 -my-1.5">
        <button type="button" class="close" @click="emit('close')">
          <span class="sr-only">Dismiss</span>
          <Icon class="h-5 w-5" aria-hidden="true" icon="heroicons:x-mark-20-solid" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alert {
  $self: &;

  @apply relative flex flex-col gap-4 px-4 py-4 rounded-md
          lg:flex-row lg:items-start;

  &__icon {
    @apply shrink-0 leading-none;

    > svg {
      @apply block h-5 w-5;
    }
  }

  &__content {
    @apply text-sm;
  }

  &__close {
    @apply ml-auto;
  }

  &__title {
    @apply font-semibold;
  }

  &__description {
    @apply mt-1 leading-tight;
  }

  &, &--is-default {
    @apply bg-gray-200 text-gray-600;
  }

  &--is-info {
    @apply bg-info text-info-content;
  }

  &--is-warning {
    @apply bg-warning text-warning-content;
  }

  &--is-success {
    @apply bg-success text-success-content;
  }

  &--is-danger {
    @apply bg-danger text-danger-content;

  }
}

.close {
  @apply inline-flex rounded-md  p-1.5 text-current transition-all duration-200 ease-in-out;

  &:hover {
    @apply bg-white bg-opacity-30 text-current;
  }
}
</style>
