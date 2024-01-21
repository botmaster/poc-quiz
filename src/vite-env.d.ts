/// <reference types="vite/client" />

// @see https://lobotuerto.com/notes/import-tailwind-config-in-vite
declare module 'tailwind-config' {
  const config: Config;
  export default config;
}
