<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheHeader from '@/components/layout/TheHeader.vue';

const { t } = useI18n();
useHead({
  title: 'My awesome site',
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <TheHeader>
      <template #header-menu-main>
        <RouterLink :to="{ name: 'about' }">
          {{ t('navMain.about') }}
        </RouterLink>
        <RouterLink :to="{ name: 'tasks' }">
          {{ t('navMain.tasks') }}
        </RouterLink>
      </template>
      <template #header-menu-panel="{ close }">
        <RouterLink :to="{ name: 'about' }" @click="close">
          {{ t('navMain.about') }}
        </RouterLink>
        <RouterLink :to="{ name: 'tasks' }" @click="close">
          {{ t('navMain.tasks') }}
        </RouterLink>
      </template>
    </TheHeader>
    <main id="main" class="flex-grow">
      <router-view />
    </main>
    <TheFooter>
      <template #footer-links>
        <RouterLink :to="{ name: 'home' }">
          {{ t('navMain.home') }}
        </RouterLink>
        <RouterLink :to="{ name: 'about' }">
          {{ t('navMain.about') }}
        </RouterLink>
        <RouterLink :to="{ name: 'tasks' }">
          {{ t('navMain.tasks') }}
        </RouterLink>
        <RouterLink :to="{ name: 'designSystemHomepage' }">
          {{ t('navMain.designSystem') }}
        </RouterLink>
      </template>
    </TheFooter>
  </div>
</template>

<style scoped lang="scss">

</style>
