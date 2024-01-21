<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import AppContainer from '@/components/layout/AppContainer.vue';

const { t } = useI18n();

useHead({
  title: 'My awesome about page',
});

useSeoMeta({
  ogDescription: 'Still about my about page',
  ogTitle: 'About',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div class="mt-8 lg:mt-14 mb-10 lg:mb-16">
    <AppContainer>
      <h2 class="heading-2 mb-8">
        {{ t('pages.about.about') }}
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse expedita facere magnam numquam omnis totam. Assumenda commodi, corporis doloremque ipsam optio provident quidem. Ad doloremque minima molestiae rem sit?</p>
    </AppContainer>
  </div>
</template>

<style scoped lang="scss">

</style>
