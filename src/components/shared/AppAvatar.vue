<script setup lang="ts">
import { computed, useSlots } from 'vue';

// Color variants type
type AvatarColorVariantType = 'default' | 'primary' | 'secondary' | 'accent' | 'danger' | 'neutral';

// Size type
type AvatarSizeType = 'sm' | 'md' | 'lg';

// Status type
type AvatarStatusType = 'active' | 'busy' | 'inactive';

export interface Props {
  size?: AvatarSizeType
  name?: string
  src?: string
  status?: AvatarStatusType
  rounded?: boolean
  colorVariant?: AvatarColorVariantType
}

// Props
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  rounded: true,
  colorVariant: 'default',
});

// Size map
const sizes: Record<AvatarSizeType, string> = {
  sm: 'avatar--sm',
  md: 'avatar--md',
  lg: 'avatar--lg',
};

// Variants map
const variants: Record<AvatarColorVariantType, string> = {
  default: 'avatar--default',
  primary: 'avatar--primary',
  secondary: 'avatar--secondary',
  accent: 'avatar--accent',
  danger: 'avatar--danger',
  neutral: 'avatar--neutral',
};

// Status map
const status: Record<AvatarStatusType, string> = {
  active: 'avatar__status--active',
  busy: 'avatar__status--busy',
  inactive: 'avatar__status--inactive',
};

const slots = useSlots();

// Computed avatar classes
const avatarClasses = computed(() => {
  const classes = [];

  if (props.size)
    classes.push(sizes[props.size]);

  if (!props.rounded)
    classes.push('avatar--is-square');

  if (props.colorVariant)
    classes.push(variants[props.colorVariant]);

  return classes.join(' ');
});

// Computed avatar status
// eslint-disable-next-line vue/return-in-computed-property
const avatarClassesStatus = computed(() => {
  if (props.status)
    return status[props.status];
});

// Computed avatar initials
const avatarInitials = computed(() => {
  if (props.name) {
    const names = props.name.split(' ');
    let initials = '';
    names.forEach((name) => {
      initials += name.substring(0, 1);
    });
    return initials.toUpperCase();
  }
  return '';
});

// Check if default slot is filled
const isDefaultSlotFilled = computed(() => {
  return slots.default && slots.default().length > 0;
});
</script>

<template>
  <div class="avatar" :class="avatarClasses">
    <figure class="avatar__figure" :role="name ? 'img' : ''" :aria-label="name" :class="colorVariant">
      <p v-if="name || isDefaultSlotFilled" :title="name" class="avatar__initials">
        <slot><span>{{ avatarInitials }}</span></slot>
      </p>
      <template v-else>
        <svg
          class="avatar__placeholder" :aria-hidden="!!src" viewBox="0 0 20 20" stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="10" cy="6" r="2.5" stroke="currentColor" />
          <path
            d="M10,10.5a4.487,4.487,0,0,0-4.471,4.21L5.5,15.5h9l-.029-.79A4.487,4.487,0,0,0,10,10.5Z"
            stroke="currentColor"
          />
        </svg>
      </template>
      <img v-if="src" class="avatar__img" :src="src" :alt="name ? name : ''">
    </figure>

    <span v-if="status" role="status" class="avatar__status" :class="avatarClassesStatus" aria-label="Active" />
  </div>
</template>

<style scoped lang="scss">
.avatar {

  $self: &;

  --_avatar-size-sm: theme('fontSize.5xl');
  --_avatar-size-md: theme('fontSize.6xl');
  --_avatar-size-lg: theme('fontSize.7xl');
  --_avatar-bg: theme('colors.gray.200');
  --_avatar-color: theme('colors.gray.800');
  --_avatar-status-active: theme('colors.success');
  --_avatar-status-busy: theme('colors.danger');
  --_avatar-status-inactive: theme('colors.neutral');
  --_avatar-border-radius: 9999px;

  position: relative;
  display: block;
  width: 1em;
  aspect-ratio: 1/1;
  //font-size: 1em;

  @apply font-medium;

  &--sm {
    font-size: var(--_avatar-size-sm);
  }

  &--md {
    font-size: var(--_avatar-size-md);
  }

  &--lg {
    font-size: var(--_avatar-size-lg);
  }

  &--is-square {
    --_avatar-border-radius: 4px;

    #{$self}__status {
      bottom: -0.05em;
      right: -0.05em;
    }
  }

  &--default {

  }

  &--primary {
    --_avatar-bg: theme('colors.primary');
    --_avatar-color: theme('colors.primary-content');
  }

  &--secondary {
    --_avatar-bg: theme('colors.secondary');
    --_avatar-color: theme('colors.secondary-content');
  }

  &--accent {
    --_avatar-bg: theme('colors.accent');
    --_avatar-color: theme('colors.accent-content');
  }

  &--neutral {
    --_avatar-bg: theme('colors.neutral');
    --_avatar-color: theme('colors.neutral-content');
  }

  &__figure {

    @apply drop-shadow-sm;

    width: 100%;
    height: 100%;
    border-radius: var(--_avatar-border-radius);
    /* avatar border-radius */
    overflow: hidden;
    background-color: var(--_avatar-bg);
    color: var(--_avatar-color);
  }

  &__img,
  &__placeholder {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  &__placeholder {
    fill: transparent;
    transform: scale(0.7);
  }

  &__status {
    position: absolute;
    bottom: 0;
    right: 0.05em;
    width: 0.2em;
    height: 0.2em;
    border-radius: 50%;
    box-shadow: 0 0 0 2px var(--color-white);
    display: none;

    &--active,
    &--busy,
    &--inactive {
      display: inline-block;
    }

    &--active {
      background-color: var(--_avatar-status-active)
    }

    &--busy {
      background-color: var(--_avatar-status-busy)
    }

    &--inactive {
      background-color: var(--_avatar-status-inactive);
    }
  }

  &__initials,
  &__users-counter {
    position: absolute;
    top: 0;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &__initials {
    /* initials - show letters if you don't have img */
    text-align: center;

    span {
      font-size: 0.35em;
    }
  }

  &__users-counter {
    /* tot number of users in a group of avatars */
    span {
      font-size: 0.35em;
    }
  }
}
</style>
