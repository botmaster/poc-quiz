<script setup lang="ts">
const headingMap = {
  1: 'heading-1',
  2: 'heading-2',
  3: 'heading-3',
  4: 'heading-4',
  5: 'heading-5',
  6: 'heading-6',
} as const;

const paragraphMap = {
  sm: 'paragraph-sm',
  md: 'paragraph-md',
  lg: 'paragraph-lg',
} as const;
</script>

<template>
  <div class="prose lg:prose-xl">
    <h1 class="">
      Typography
    </h1>
    <h2>
      Headings
    </h2>
    <div class="rounded-lg px-4 py-3 border bg-gray-50">
      <div v-for="(_value, key) in headingMap" :key="key" class="not-prose mb-3">
        <pre class="text-gray-600 text-sm">{{ `heading-${key}` }}</pre>
        <component :is="`h${key}`" :class="headingMap[key]">
          This is a heading
        </component>
      </div>
    </div>
  </div>
  <hr class="-mx-8 my-16">
  <div class="prose lg:prose-xl">
    <h2>
      Paragraphs
    </h2>
    <div class="rounded-lg px-4 py-3 border bg-gray-50">
      <div v-for="(value, key) in paragraphMap" :key="key" class="not-prose mb-3">
        <pre class="text-gray-600 text-sm">{{ value }}</pre>
        <p :class="paragraphMap[key]">
          Lorem <i>ipsum</i> dolor sit amet consectetur <s>adipisicing elit</s>. Quisquam
          voluptatum, <a href="#">voluptate</a>, quibusdam, quia voluptas quod dolorum
          <b>exercitationem</b> voluptatem quos quas quidem. Quisquam voluptatum,
          voluptate, quibusdam, quia voluptas quod
          <mark>dolorum</mark> exercitationem
          voluptatem quos quas quidem.
        </p>
      </div>
    </div>
  </div>
  <hr class="-mx-8 my-16">
  <div class="prose lg:prose-xl">
    <h2>
      Prose (Tailwindcss Typography)
    </h2>
    <div class="prose prose-slate mx-auto mt-8 lg:prose-lg">
      <h2>Typography should be easy</h2>
      <p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
      <p>Something a wise person once told me about typography is:</p>
      <blockquote><p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p></blockquote>
      <p>It's probably important that images look okay here by default as well:</p>
      <figure>
        <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="">
        <figcaption>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</figcaption>
      </figure>
      <p>Now I'm going to show you an example of an unordered list to make sure that looks good, too:</p>
      <ul>
        <li>So here is the first item in this list.</li>
        <li>In this example we're keeping the items short.</li>
        <li>Later, we'll use longer, more complex list items.</li>
      </ul>
      <p>And that's the end of this section.</p>
      <h2>What if we stack headings?</h2>
      <h3>We should make sure that looks good, too.</h3>
      <p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>
      <h3>When a heading comes after a paragraph …</h3>
      <p>When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.</p>
      <ul>
        <li>
          <p><strong>I often do this thing where list items have headings.</strong></p>
          <p>For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.</p>
          <p>I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.</p>
        </li>
        <li>
          <p><strong>Since this is a list, I need at least two items.</strong></p>
          <p>I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.</p>
        </li>
        <li>
          <p><strong>It's not a bad idea to add a third item either.</strong></p>
          <p>I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.</p>
        </li>
      </ul>
      <p>After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.</p>
      <p>...</p>

      <hr>
    </div>
  </div>
</template>
