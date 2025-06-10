// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import tailwind from "@astrojs/tailwind";

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // vite: {
  //   plugins: [tailwindcss()]
  // },
  output: "server",
  integrations: [tailwind()],
  adapter: netlify(),

});