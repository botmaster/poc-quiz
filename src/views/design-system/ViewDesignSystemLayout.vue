<script setup lang="ts">
import AppGridLayout from '@/components/layout/AppGridLayout.vue';
</script>

<template>
  <div class="prose lg:prose-xl">
    <h1 class="">
      Layout
    </h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta expedita fugiat incidunt ipsa laudantium magnam
      odio quidem saepe similique tempora, tenetur vel voluptatem voluptates. Debitis dolores excepturi exercitationem
      praesentium rem.
    </p>
  </div>

  <div class="container mt-20 flow">
    <h2 class="heading-2">
      Tailwindcss Container
    </h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aspernatur doloribus dolorum earum,
      esse eum eveniet exercitationem iste molestias nisi nobis nulla obcaecati odio perferendis quos ratione
      reiciendis repellendus.
    </p>
  </div>

  <div class="no-prose">
    <AppGridLayout tag="section" class="flow mt-20 bg-black text-gray-100 py-20">
      <h2 class="heading-2">
        Grid Layout Container
      </h2>
      <p>
        It can be useful to have a system in place that's easy to go full-width, or have a "breakout" section for calls
        to
        action or blockquotes, or other things you want to call attention to.
      </p>
      <p class="breakout">
        Traditionally, we use a container or wrapper, which we need to close, and then open again, but thanks to grid,
        and
        with the recent additions of subgrid to all the evergreen browsers, maybe there's a better way to do things?
      </p>
      <p>
        It has it's downsides, as the code is more complex, and it's not as obvious how it works when we're so used to
        the
        old pattern.
      </p>
      <p>That said, we shouldn't limit ourselves just because we are used to working in a specific way.</p>

      <section class="full-width bg-primary section-padding flow">
        <h2 class="heading-2">
          This section has a different background-color
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam voluptates vitae reiciendis corporis
          molestias aspernatur vero eaque obcaecati neque dolores veritatis repudiandae voluptas consectetur voluptatum
          nobis maiores doloremque, nostrum deleniti!
        </p>
        <p>
          Aspernatur, dignissimos. Quaerat corporis, itaque porro dolore ea a placeat molestiae nihil voluptatem veniam
          facere, corrupti in vel, voluptates enim soluta sint dolores? Quaerat laboriosam iusto voluptatem accusantium
          ex
          alias?
        </p>
      </section>

      <h2 class="heading-2">
        Back to normal
      </h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto nam at praesentium cumque rem molestias
        earum
        officia neque nemo sunt laboriosam vero eum optio, saepe dolorem exercitationem quod asperiores iste?
      </p>
      <p class="breakout bg-accent px-4 py-3 rounded-xl text-body-text">
        Not sure why, but we could set things up if ever you wanted random text to be full-bleed
        without
        bothering with a div or anything on the outside of it as well
      </p>
      <p>
        Error nulla doloribus ex, eius voluptates saepe, in quae ea nesciunt rem possimus obcaecati consequuntur
        deleniti.
        Tempore deleniti deserunt harum, distinctio, culpa atque numquam ducimus repellat fugit iusto eveniet velit.
      </p>
      <h3>Images as full-bleed works too</h3>
      <img class="breakout w-full my-20" src="https://unsplash.it/1600/400" alt="">
      <p>
        Exercitationem dolorum animi at autem tempore omnis, dolorem saepe sint totam architecto, vitae cum doloribus
        illo?
        Laudantium laboriosam saepe eligendi ipsam corrupti molestias expedita tempora eos minima, facere, eius dicta.
      </p>
      <p>
        Magnam eius beatae similique officiis quaerat. Natus est dicta temporibus a. Aut mollitia magnam quo. Sequi
        repellendus voluptas quia suscipit autem iste! Accusamus, delectus beatae inventore obcaecati ut totam ab.
      </p>

      <p>
        Eligendi ea maiores asperiores sed nobis qui, animi sint? Ratione laboriosam cum quasi repudiandae in,
        necessitatibus veritatis nihil perferendis maiores consequuntur magnam perspiciatis minus est quibusdam,
        voluptate
        voluptas natus corporis.
      </p>
      <p>
        Vero, facilis! Animi quam dolor a sunt, quae placeat perspiciatis quia odio quisquam at tempore dolorem eum
        ratione
        vel minima eaque repellendus dolores architecto necessitatibus velit reprehenderit amet et rem.
      </p>
      <p>
        Quos, animi expedita facere iste soluta accusamus et facilis, temporibus nemo praesentium iusto aliquam
        voluptas
        magnam pariatur blanditiis optio, corporis laborum quas? Quis libero aperiam est fuga veniam eos tenetur?
      </p>

      <section class="bg-primary full-width">
        <h3>content</h3>
      </section>
    </AppGridLayout>
  </div>
</template>

<style scoped lang="scss">
p {
  @apply paragraph-lg;
}
</style>
