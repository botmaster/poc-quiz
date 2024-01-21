<script setup lang="ts">
import _capitalize from 'lodash/capitalize';

// import resolveConfig from 'tailwindcss/resolveConfig';
// import tailwindConfig from 'tailwind-config';

// const fullConfig = resolveConfig(tailwindConfig);

// const colors = fullConfig.theme.colors;

interface IColor {
  default: {
    hex: string
    hsl: string
  }
  content?: {
    hex: string
    hsl: string
  }
}

interface IColorData {
  id: number
  name: string
  value?: IColor
  description: string
  classes: string
}

// Body styles
const bodyStyles = getComputedStyle(document.body);

// Colors data
const baseColorData: Array<IColorData> = [
  {
    id: 1,
    name: 'primary',
    description: 'Primary color',
    classes: 'bg-primary',
  },
  {
    id: 2,
    name: 'secondary',
    description: 'Secondary color',
    classes: 'bg-secondary',
  },
  {
    id: 3,
    name: 'accent',
    description: 'Accent color',
    classes: 'bg-accent',
  },
  {
    id: 4,
    name: 'neutral',
    description: 'Neutral color',
    classes: 'bg-neutral',
  },
];

baseColorData.forEach((item) => {
  item.value = {
    default: {
      hex: bodyStyles.getPropertyValue(`--color-${item.name}-hex`),
      hsl: bodyStyles.getPropertyValue(`--color-${item.name}`),
    },
    content: {
      hex: bodyStyles.getPropertyValue(`--color-${item.name}-content-hex`),
      hsl: bodyStyles.getPropertyValue(`--color-${item.name}-content`),
    },
  };
});

// Colors feedback
const feedbackColorData: Array<IColorData> = [
  {
    id: 1,
    name: 'success',
    description: 'Success color',
    classes: 'bg-success',
  },
  {
    id: 2,
    name: 'warning',
    description: 'Warning color',
    classes: 'bg-warning',
  },
  {
    id: 3,
    name: 'danger',
    description: 'Danger color',
    classes: 'bg-danger',
  },
  {
    id: 4,
    name: 'info',
    description: 'Info color',
    classes: 'bg-info',
  },
];

feedbackColorData.forEach((item) => {
  item.value = {
    default: {
      hex: bodyStyles.getPropertyValue(`--color-${item.name}-hex`),
      hsl: bodyStyles.getPropertyValue(`--color-${item.name}`),
    },
    content: {
      hex: bodyStyles.getPropertyValue(`--color-${item.name}-content-hex`),
      hsl: bodyStyles.getPropertyValue(`--color-${item.name}-content`),
    },
  };
});

const colorItemMap: Record<string, string> = {
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
  'gray-200': 'bg-gray-200',
  'gray-300': 'bg-gray-300',
  'gray-400': 'bg-gray-400',
  'gray-500': 'bg-gray-500',
  'gray-600': 'bg-gray-600',
  'gray-700': 'bg-gray-700',
  'gray-800': 'bg-gray-800',
  'gray-900': 'bg-gray-900',
  'gray-950': 'bg-gray-950',
};

// Generate color data
const colorData = Object.entries(colorItemMap).map(([key, value]) => {
  return {
    id: key,
    name: key,
    value: {
      hex: bodyStyles.getPropertyValue(`--color-${key}-hex`),
      hsl: bodyStyles.getPropertyValue(`--color-${key}`),
    },
    description: _capitalize(key),
    classes: value,
  };
});
</script>

<template>
  <div class="prose lg:prose-xl">
    <h1 class="">
      Colors
    </h1>
    <h2>
      Main colors
    </h2>
    <div class="not-prose">
      <ul class="color-list">
        <li v-for="(item, index) in baseColorData" :key="index">
          <div class="color-item">
            <div class="color-item__sample" :class="item.classes">
              <span v-if="item.value?.content" :style="`color: ${item.value?.content?.hex}`">Content: {{ item.value?.content?.hex }}</span>
            </div>
            <p class="color-item__description">
              {{ item.description }}<br>
              <code>{{ item.value?.default.hex }}</code><br>
              <code>{{ item.value?.default.hsl }}</code>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <h2>Feedback colors</h2>
    <div class="not-prose mt-6">
      <ul class="color-list">
        <li v-for="(item, index) in feedbackColorData" :key="index">
          <div class="color-item">
            <div class="color-item__sample" :class="item.classes">
              <span v-if="item.value?.content" :style="`color: ${item.value?.content?.hex}`">Content: {{ item.value?.content?.hex }}</span>
            </div>
            <p class="color-item__description">
              {{ item.description }}<br>
              <code>{{ item.value?.default.hex }}</code><br>
              <code>{{ item.value?.default.hsl }}</code>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <h2>Gray scale</h2>
    <div class="not-prose mt-6">
      <ul class="color-list">
        <li v-for="(item, index) in colorData" :key="index">
          <div class="color-item">
            <div class="color-item__sample" :class="item.classes" />
            <p class="color-item__description">
              {{ item.description }}<br>
              <code>{{ item.value?.hex }}</code><br>
              <code>{{ item.value?.hsl }}</code>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .color-list {
    @apply list-none grid gap-4;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }

  .color-item {
    @apply flex items-start gap-4 text-xs;

    &__sample {
      @apply relative w-32 h-32 shrink-0;

      span {
        @apply absolute bottom-2 right-2 text-xs font-bold;
      }
    }

    &__description {
      @apply text-muted-text text-sm;

      code {
        @apply text-xs;
      }
    }
  }
</style>
