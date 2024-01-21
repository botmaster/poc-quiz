<script setup lang="ts">
import { useMouse } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import useCounter from '@/composables/useCounter';
import PhoneFrame from '@/components/PhoneFrame.vue';
import HeroMain from '@/components/HeroMain.vue';
import AppContainer from '@/components/layout/AppContainer.vue';

const { t } = useI18n();
const { count, isEven, increment, decrement } = useCounter();

// tracks mouse position
const { x, y } = useMouse();
</script>

<template>
  <HeroMain />

  <section class="mb-12 lg:mb-24">
    <AppContainer>
      <pre>Mouse position: {{ x }}, {{ y }}</pre>
      <pre>Count: {{ count }}<button class="btn ml-4 btn--sm" @click="increment">
          +
        </button><button class="btn ml-2 btn--sm" @click="decrement">
          -
        </button></pre>
      <pre>Is even: {{ isEven }}</pre>
      <div class="flex gap-3" />
    </AppContainer>
  </section>

  <section class="bg-gray-900 py-12 sm:py-32 text-white">
    <AppContainer>
      <div class="mx-auto lg:mx-0 lg:max-w-3xl flow">
        <h2 class="heading-2">
          {{ t('pages.homepage.myAwesomeFeature') }}
        </h2>
        <p class="">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, cum cumque earum, ipsa mollitia nisi nobis omnis praesentium quas quis rem repellat repudiandae saepe suscipit tempore? Aliquam aliquid doloremque labore.
        </p>
      </div>
    </AppContainer>
    <AppContainer class="mt-8 lg:mt-16">
      <div class="lg:grid grid-cols-12 gap-16">
        <div class="col-span-6">
          <div>
            <PhoneFrame class="max-w-[366px] mx-auto">
              <div class="py-12 px-5 text-white bg-neutral h-full">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi dolore dolorum, eius et, facilis incidunt laboriosam laborum laudantium necessitatibus nobis pariatur quae quod unde voluptas. Ad molestias mollitia sed.</p>
              </div>
            </PhoneFrame>
          </div>
        </div>
        <div class="mt-8 lg:mt-0 col-span-6 flow">
          <h3 class="heading-3">
            Lorem ipsum dolor.
          </h3>
          <p class="">
            Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipisicing elit. Adipisci dicta enim eos iusto nam porro quam quia reiciendis saepe sequi? Deleniti eum in molestiae mollitia nulla quam quo rem velit.
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style  lang="scss">

</style>
