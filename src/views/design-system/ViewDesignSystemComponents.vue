<script setup lang="ts">
import PartialAlerts from '@/components/design-system/partials/PartialAlerts.vue';
import PartialBadge from '@/components/design-system/partials/PartialBadge.vue';
import PartialButtons from '@/components/design-system/partials/PartialButtons.vue';
import PartialAvatars from '@/components/design-system/partials/PartialAvatars.vue';
</script>

<template>
  <div class="prose lg:prose-xl">
    <h1 class="">
      Components
    </h1>

    <!-- Buttons -->
    <PartialButtons />
  </div>
  <hr class="-mx-8 my-16">
  <div class="prose lg:prose-xl">
    <!-- Avatar -->
    <PartialAvatars />
  </div>
  <hr class="-mx-8 my-16">
  <div class="prose lg:prose-xl">
    <!-- Badge -->
    <PartialBadge />
  </div>
  <hr class="-mx-8 my-16">
  <div class="prose lg:prose-xl">
    <!-- Alerts -->
    <PartialAlerts />
  </div>
</template>

<style scoped lang="scss">
:deep(.header-anchor) {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -0.87em;
  font-size: 0.75em;
  font-weight: 500;
  -webkit-user-select: none;
  user-select: none;
  opacity: 0;
  transition: color .25s,opacity .25s;

  &:before {
    content: "#";
  }
}

:deep(h2:has(.header-anchor):hover .header-anchor) {
  opacity: 1;
}
</style>
