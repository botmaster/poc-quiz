<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// Is aside open?
const isOpen = ref(false);

// Toggle aside
/* function toggle() {
  isOpen.value = !isOpen.value;
} */

// Close aside
function close() {
  isOpen.value = false;
}

// Open aside
function open() {
  isOpen.value = true;
}

// Close aside on route change
const router = useRouter();
watch(
  () => router.currentRoute.value,
  () => {
    close();
  },
);
</script>

<template>
  <div class="min-h-screen lg:flex bg-white">
    <aside
      class="relative transition ease-in-out mb-16 bg-white lg:mb-0 lg:fixed lg:flex lg:top-0 lg:left-0 lg:bottom-0 lg:bg-white/15 lg:backdrop-blur-3xl z-10 lg:translate-x-[-100%]"
      :class="isOpen ? 'lg:translate-x-[0%]' : 'lg:translate-x-[-100%]'"
    >
      <div class="lg:w-72 p-4 lg:border-r">
        <ul>
          <li class="flex justify-between">
            <router-link to="/">
              Back to site
            </router-link>
            <div class="hidden lg:block">
              <button v-if="isOpen" @click="close">
                close
              </button>
              <button v-else class="absolute right-0 bg-gray-800 px-2 py-1 flex gap-2 items-center !text-white !no-underline !transition ease-in-out !delay-500 translate-x-[30%] hover:translate-x-[100%] hover:!delay-0" @click="open">
                <span>open</span> <Icon icon="material-symbols:chevron-right" :inline="true" />
              </button>
            </div>
          </li>
          <li>
            <hr class="-mx-4 my-4">
          </li>
          <li>
            <router-link :to="{ name: 'designSystem' }">
              Intro
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'designSystemColors' }">
              Colors
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'designSystemTypography' }">
              Typography
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'designSystemIcons' }">
              Icons
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'designSystemComponents' }">
              Components
            </router-link>
            <ul class="ml-4 text-sm">
              <li>
                <RouterLink :to="{ name: 'designSystemComponents', hash: '#button' }">
                  Button
                </RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'designSystemComponents', hash: '#avatar' }">
                  Avatar
                </RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'designSystemComponents', hash: '#badge' }">
                  Badge
                </RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'designSystemComponents', hash: '#alert' }">
                  Alert
                </RouterLink>
              </li>
            </ul>
          </li>
          <li>
            <router-link :to="{ name: 'designSystemLayout' }">
              Layout
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
    <main class="relative px-4 lg:grow lg:my-11 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">

</style>
