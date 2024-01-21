<script setup lang="ts">
/**
 * A component for fixing an element's width to the current breakpoint.
 * @see https://tailwindcss.com/docs/container
 *
 * Note: This component is not used in the default layout.
 * I don't know if it is useful. Maybe a simple div with a class is enough.
 */

const props = withDefaults(defineProps<{ tag?: string }>(), {
  tag: 'div',
});
</script>

<template>
  <component :is="props.tag" class="container">
    <slot />
  </component>
</template>

<style scoped lang="scss">

</style>
