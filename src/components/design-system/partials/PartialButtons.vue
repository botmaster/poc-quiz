<script setup lang="ts">
import IconCheckSvg from '@svg/icon-check.svg?component';
import { Icon } from '@iconify/vue';
import AppButton from '@/components/shared/AppButton.vue';

const variants = [
  'default',
  'primary',
  'secondary',
  'accent',
  'neutral',
  'ghost',
  'link',
] as const;
</script>

<template>
  <h2 id="button" class="relative">
    Buttons
    <a class="header-anchor" href="#button" aria-label="Permalink to &quot;useColorMode&quot;">&nbsp;</a>
  </h2>
  <p>
    Component <code>AppButton</code>
  </p>

  <div class="lg:grid lg:grid-cols-2 lg:gap-8">
    <div>
      <h3 class="!mt-0">
        Variants
      </h3>
      <div class="flex flex-wrap gap-2 not-prose">
        <AppButton v-for="variant in variants" :key="variant" :color-variant="variant">
          {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
        </AppButton>
        <AppButton disabled>
          Disabled
        </AppButton>
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        Outlined
      </h3>
      <div class="flex flex-wrap gap-2 not-prose">
        <AppButton v-for="variant in variants" :key="variant" :color-variant="variant" outlined>
          {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
        </AppButton>
        <AppButton disabled outlined>
          Disabled
        </AppButton>
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        Sizes
      </h3>
      <div class="flex gap-2 items-end not-prose">
        <AppButton color-variant="primary" size="lg">
          Lg
        </AppButton>
        <AppButton color-variant="primary" size="md">
          Md
        </AppButton>
        <AppButton color-variant="primary" size="sm">
          Sm
        </AppButton>
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        With icons
      </h3>
      <div class="flex gap-2 items-end not-prose">
        <AppButton color-variant="primary" size="sm">
          <IconCheckSvg />
          <span>With icon</span>
        </AppButton>
        <AppButton color-variant="primary">
          <IconCheckSvg />
          <span>With icon</span>
        </AppButton>
        <AppButton color-variant="primary" size="lg">
          <IconCheckSvg />
          <span>With icon</span>
        </AppButton>
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        Is Icon
      </h3>
      <div class="flex gap-2 items-end not-prose">
        <AppButton size="lg" icon>
          <Icon icon="uim:vuejs" :inline="true" />
          <span class="sr-only">Vue.js</span>
        </AppButton>
        <AppButton icon>
          <Icon icon="uim:vuejs" :inline="true" />
          <span class="sr-only">Vue.js</span>
        </AppButton>
        <AppButton size="sm" icon>
          <Icon icon="uim:vuejs" :inline="true" />
          <span class="sr-only">Vue.js</span>
        </AppButton>
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        Loading
      </h3>
      <div class="flex gap-2 items-end not-prose">
        <AppButton color-variant="primary" loading>
          coucou
        </AppButton>
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        Types
      </h3>
      <div class="flex gap-2 items-end not-prose">
        <AppButton color-variant="primary" tag="a" href="#">
          Tag is a
        </AppButton>
        <AppButton
          color-variant="primary"
          tag="input"
          type="submit"
          value="Tag is input"
        />
      </div>
    </div>
    <div>
      <h3 class="!mt-0">
        Buttons with different HTML tags
      </h3>
      <div class="flex flex-wrap gap-2 items-end not-prose">
        <a role="button" class="btn">Link</a>
        <button type="submit" class="btn">
          Button
        </button>
        <input type="button" value="Input" class="btn">
        <input type="submit" value="Submit" class="btn">
        <!--        <input type="radio" aria-label="Radio" class="btn">
        <input type="checkbox" aria-label="Checkbox" class="btn"> -->
        <input type="reset" value="Reset" class="btn">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
