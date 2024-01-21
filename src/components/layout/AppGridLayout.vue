<script setup lang="ts">
/**
 * A component for page element layout.
 */

const props = withDefaults(defineProps<{ tag?: string }>(), {
  tag: 'div',
});
</script>

<template>
  <component :is="props.tag" class="grid-layout">
    <slot />
  </component>
</template>

<style lang="scss">
.grid-layout {
  --_padding-inline: theme('spacing.8');
  --_content-max-width: theme('screens.2xl');
  --_breakout-max-width: var(--_content-max-width) * 1.08;

  --breakout-size: calc(
    (var(--_breakout-max-width) - var(--_content-max-width)) / 2
  );

  display: grid;
  grid-template-columns:
    [full-width-start] minmax(var(--_padding-inline), 1fr)
    [breakout-start] minmax(0, var(--breakout-size))
    [content-start] min(
      100% - (var(--_padding-inline) * 2),
      var(--_content-max-width)
    )
    [content-end]
    minmax(0, var(--breakout-size)) [breakout-end]
    minmax(var(--_padding-inline), 1fr) [full-width-end];

  & > :not(.breakout, .full-width) {
    grid-column: content;
  }

  & > .breakout {
    grid-column: breakout;
  }

  & > .full-width {
    grid-column: full-width;

    display: grid;
    grid-template-columns: inherit;
  }

  & + & {
    margin-top: 2rem;
  }

  /*@screen md {
    --_padding-inline: theme('spacing.6');
    --_content-max-width: calc(theme('screens.md') - theme('spacing.6') * 2);
  }

  @screen lg {
    --_padding-inline: theme('spacing.8');
    --_content-max-width: calc(theme('screens.lg') - theme('spacing.8') * 2);
  }

  @screen xl {
    --_content-max-width: calc(theme('screens.xl') - theme('spacing.8') * 2);
  }

  @screen 2xl {
    --_content-max-width: calc(theme('screens.2xl') - theme('spacing.8') * 2);
  }*/
}

.full-width > :not(.breakout, .full-width) {
  grid-column: content;
}

.section-padding {
  padding-block: 2.5rem;
}
</style>
