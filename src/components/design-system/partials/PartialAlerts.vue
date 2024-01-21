<script setup lang="ts">
import AppAlert from '@/components/shared/AppAlert.vue';
</script>

<template>
  <h2 id="alert" class="relative">
    Alert
    <a class="header-anchor" href="#alert" aria-label="Permalink to &quot;alert&quot;">&nbsp;</a>
  </h2>

  <p>
    Component <code>AppAlert</code>
  </p>

  <h3>Variants</h3>
  <div class="space-y-4 not-prose md:text-base">
    <AppAlert title="Alert with title, description and close button" description="Alert description" />
    <AppAlert title="Alert with title and close button" />
    <AppAlert :closable="false" title="Alert with title and no close button" />
    <AppAlert>
      <div class="flow">
        <h3 class="heading-3">
          Alert with custom content (slot)
        </h3>
        <img src="https://picsum.photos/400/250" alt="" class="block mx-auto">
        <p class="paragraph-lg">
          Lorem ipsum dolor sit amet, <a href="#alert">consectetur</a> adipisicing elit. Consequuntur culpa dicta eaque fugit nam quae qui quod recusandae repellendus repudiandae. Autem est itaque voluptate? Ad exercitationem inventore officia porro quo!
        </p>
      </div>
    </AppAlert>
  </div>

  <h3 class="">
    Statuses
  </h3>
  <div class="space-y-4 not-prose md:text-base">
    <AppAlert status="info" title="Info" />
    <AppAlert status="warning" title="Warning" description="Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo." />
    <AppAlert status="danger" title="Danger" />
    <AppAlert status="success" title="Success" />
  </div>
</template>

<style scoped lang="scss">

</style>
