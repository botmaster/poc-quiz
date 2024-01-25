<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import HeroMain from '@/components/HeroMain.vue';
import AppButton from '@/components/shared/AppButton.vue';

const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <HeroMain>
    <h1 class="heading-1">
      This is a drill!
    </h1>
    <p class="mt-6 paragraph-lg text-gray-600">
      This is a POC of quiz app built with Vue 3, Vite, Tailwind CSS, and TypeScript.
    </p>
    <p class="mt-6 lg:mt-14">
      <AppButton color-variant="primary" size="lg" @click="router.push({ name: 'quiz' })">
        {{ t('pages.homepage.hero.cta') }}
      </AppButton>
    </p>
  </HeroMain>
</template>
