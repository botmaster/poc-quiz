<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppButton from '@/components/shared/AppButton.vue';

const { t } = useI18n();
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__wrapper">
        <div class="footer__main">
          <div class="footer__corporate">
            <img width="50" height="39" src="@/assets/svg/logoipsum-245.svg?url" alt="">
            <div class="ml-4">
              <p class="text-base font-semibold">
                Logoipsum
              </p>
              <p class="mt-1 text-sm">
                Baseline Lorem ipsum dolor sit.
              </p>
            </div>
          </div>
          <nav class="footer__nav">
            <slot name="footer-links">
              <router-link to="home" target="_blank" class="text-sm text-gray-500 hover:text-gray-900">
                Change me
              </router-link>
            </slot>
          </nav>
        </div>
      </div>
      <div class="footer__footer">
        <form class="footer__form" @submit.prevent="">
          <label for="input-email-address" class="sr-only">{{ t('footer.form.emailAddress') }}</label>
          <input
            id="input-email-address"
            type="email"
            :aria-label="t('footer.form.emailAddress')"
            :placeholder="t('footer.form.emailAddress')"
            auto-complete="email"
            required
            class="form-input min-w-0 shrink text-xs lg:w-60 py-1"
          >
          <AppButton type="submit" color-variant="neutral" size="sm" class="flex-none rounded-l-none">
            <span class="hidden lg:inline">{{ t('footer.form.joinOurNewsletter') }}</span>
            <span class="lg:hidden">{{ t('footer.form.joinNewsletter') }}</span>
          </AppButton>
        </form>
        <p class="footer__footer-info">
          {{ t('footer.copyright', { year: 2023 }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  @apply border-t border-gray-200;

  &__container {
    @apply max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  &__wrapper {
    @apply flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16;
  }

  &__corporate {
    @apply flex items-center text-gray-900;
  }

  &__nav {
    @apply mt-11 flex flex-wrap gap-x-6 gap-y-2;

    &:deep(> a) {
      @apply no-underline;
    }
  }

  &__main {
    //
  }

  &__footer {
    @apply flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6
  }

  &__form {
    @apply flex w-full justify-center  md:w-auto;
  }

  &__footer-info {
    @apply mt-6 text-sm text-muted-text md:mt-0;
  }
}
</style>
