<script setup lang="ts">
import { computed } from 'vue';
import IconLoaderSvg from '@svg/icon-loader.svg?component';

// Color variants type
type ButtonColorVariantType = 'default' | 'primary' | 'secondary' | 'accent' | 'danger' | 'neutral' | 'link' | 'ghost' | 'outlined';

// Size type
type ButtonSizeType = 'sm' | 'md' | 'lg';

// Props types
export interface Props {
  colorVariant?: ButtonColorVariantType
  outlined?: boolean
  size?: ButtonSizeType
  disabled?: boolean
  readonly?: boolean
  tag?: string
  loading?: boolean
  icon?: boolean
}

// Props
const props = withDefaults(defineProps<Props>(), {
  outlined: false,
  size: 'md',
  disabled: false,
  readonly: false,
  tag: 'button',
  loading: false,
  icon: false,
});

// variants map
const variants: Record<ButtonColorVariantType, string> = {
  default: 'btn--default',
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  accent: 'btn--accent',
  danger: 'btn--danger',
  neutral: 'btn--neutral',
  link: 'btn--link',
  ghost: 'btn--ghost',
  outlined: 'btn--outlined',
};

// Size map
const sizes: Record<ButtonSizeType, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

// Computed classes
const classes = computed(() => {
  const classes = [];

  if (props.loading)
    classes.push('btn--loading');

  if (props.colorVariant)
    classes.push(variants[props.colorVariant]);

  if (props.outlined)
    classes.push('btn--outlined');

  if (props.size)
    classes.push(sizes[props.size]);

  if (props.disabled || props.readonly)
    classes.push('btn--disabled');

  if (props.icon)
    classes.push('btn--icon');

  return classes.join(' ');
});
</script>

<template>
  <Component :is="tag" class="btn" :class="classes">
    <template v-if="loading">
      <span class="flex gap-1.5 opacity-0">
        <slot />
      </span>
      <span class="absolute"><IconLoaderSvg class="w-[1.8em] fill-current" /></span>
    </template>
    <template v-else>
      <slot />
    </template>
  </Component>
</template>

<style scoped lang="scss"></style>
