<script setup lang="ts">

</script>

<template>
  <div class="relative aspect-[366/729]">
    <div class="absolute rounded-2xl overflow-hidden bg-primary bg-opacity-100 inset-x-[5%] inset-y-[2%]">
      <slot>
        <div class="py-8 px-5 text-gray-800">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi dolore dolorum, eius et, facilis incidunt laboriosam laborum laudantium necessitatibus nobis pariatur quae quod unde voluptas. Ad molestias mollitia sed.</p>
        </div>
      </slot>
    </div>

    <img
      src="@/assets/svg/phone-frame.svg?url"
      alt=""
      class="pointer-events-none absolute inset-0 h-full w-full"
    >
  </div>
</template>

<style scoped lang="scss">

</style>
