<script setup lang="ts">
/**
 * Header component
 *
 * Burger menu is based on Headless UI Popover component (https://headlessui.dev/vue/popover)
 * @see https://headlessui.dev/vue/popover
 */

import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import AppButton from '@/components/shared/AppButton.vue';

// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();
</script>

<template>
  <header class="header">
    <nav>
      <div class="header__container ">
        <div class="header__nav">
          <RouterLink :to="{ name: 'home' }" aria-label="Home">
            <img width="170" height="41" src="@/assets/svg/logoipsum-264.svg?url" alt="">
          </RouterLink>
          <div class="header__menu-main">
            <slot name="header-menu-main">
              <RouterLink :to="{ name: 'home' }">
                Change me
              </RouterLink>
            </slot>
          </div>
        </div>
        <div class="header__actions">
          <Popover v-slot="{ open }" class="popover">
            <PopoverButton
              class="popover__button"
              aria-label="Toggle site navigation"
            >
              <Transition name="fade">
                <Icon v-if="open" icon="material-symbols:close" :inline="true" mode="svg" />
                <Icon v-else icon="material-symbols:menu" :inline="true" mode="svg" />
              </Transition>
            </PopoverButton>
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition duration-50 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <PopoverOverlay
                as="div"
                class="popover__overlay"
              />
            </transition>
            <transition
              enter-active-class="transition duration-300 ease-out delay-50"
              enter-from-class="-translate-y-3 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="-translate-y-3 opacity-0"
            >
              <PopoverPanel
                v-slot="{ close }" class="popover__panel"
              >
                <div class="popover__panel-menu">
                  <slot name="header-menu-panel" :close="close">
                    <RouterLink :to="{ name: 'home' }">
                      Change me
                    </RouterLink>
                  </slot>
                </div>
                <div class="popover__panel-actions">
                  <RouterLink class="btn btn--neutral btn--outlined" :to="{ name: 'about' }">
                    Log in
                  </RouterLink>
                  <AppButton color-variant="neutral">
                    Download the app
                  </AppButton>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <AppButton color-variant="ghost" class="hidden lg:block">
            Log in
          </AppButton>
          <AppButton color-variant="neutral" class="hidden lg:inline-flex">
            <Icon icon="mdi:download" /><span>Download</span>
          </AppButton>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
  .header {

    &__container {
      @apply  relative z-20 px-4 max-w-screen-2xl mx-auto sm:px-6 lg:px-8 py-6 flex justify-between;
    }

    &__nav {
      @apply relative z-10 flex items-center gap-16;
    }

    &__actions {
      @apply flex items-center gap-6;
    }

    &__menu-main {
      @apply hidden lg:flex lg:gap-6;

       &:deep(> a) {
           @apply no-underline;

         &[aria-current="page"] {
           @apply text-accent;
         }
       }
    }

  }

  :deep(*) {
    .popover {

      @apply lg:hidden;

      &__button {
        @apply relative z-10 text-xl leading-[0] aspect-square flex items-center justify-center rounded-full w-10 h-10
        hover:bg-white/70 hover:text-current focus:outline-0 focus:bg-white/70
        transition-colors duration-300;
      }

      &__overlay {
        @apply fixed inset-0 z-0 bg-gray-300/60 backdrop-blur;
      }

      &__panel {
        @apply absolute inset-x-0 top-0 z-0  mx-auto origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20;
      }

      &__panel-menu {
        @apply flex flex-col gap-2
      }

      &__panel-actions {
        @apply mt-8 flex flex-col gap-4;
      }
    }
  }

  /* 1. declare transition */
  .fade-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.25s;
    transform-origin: center;
  }

  /* 2. declare enter from and leave to state */
  .fade-enter-from {
    opacity: 0;
    transform:  scale(1.4);
  }
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.2);
  }

  /* 3. ensure leaving items are taken out of layout flow so that moving
        animations can be calculated correctly. */
  .fade-leave-active {
    position: absolute;
  }
</style>
