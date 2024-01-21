<script setup lang="ts">
import Badge from '@/components/shared/AppBadge.vue';

const colors = [
  'default',
  'info',
  'danger',
  'warning',
  'success',
  'neutral',
] as const;
</script>

<template>
  <h2 id="badge" class="relative">
    Badges
    <a class="header-anchor" href="#badge" aria-label="Permalink to &quot;useColorMode&quot;">&nbsp;</a>
  </h2>

  <p>
    Component <code>AppBadge</code>
  </p>

  <h3 class="">
    Variants
  </h3>
  <div class="flex items-end  gap-3 not-prose">
    <Badge v-for="color in colors" :key="color" :label="color" :color-variant="color" />
    <Badge label="Custom" class="bg-[#CCFFDD] text-[#33DDFF]" />
  </div>
  <h3 class="">
    CSS component
  </h3>
  <div class="flex items-end  gap-3 not-prose">
    <span class="badge bg-gray-200 text-gray-700">Custom</span><span class="badge badge--is-success">Success</span>
  </div>
</template>

<style scoped lang="scss">

</style>
