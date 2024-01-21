<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
// const route = useRoute();
const skipLink = ref();

/* watch(
  () => route.path,
  () => {
    skipLink.value.focus();
  },
); */
</script>

<template>
  <ul class="skip-links ">
    <li>
      <a ref="skipLink" href="#main" class="skip-link">{{ t('common.skipToMainContent') }}</a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.skip-links {

  @apply fixed z-50 inset-x-0 top-2 flex justify-center transition-all;

  &:not(:focus-within) {
    transform: translateY(calc(-100% - 2rem));
    opacity: 0;
  }
}

.skip-link {

}
</style>
