import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(
    {
      preprocess: sveltePreprocess({
        scss: {
          // prependData: `@use './src/style/main.scss' as *;`
        }
      }),
      css: css => {
        css.write('public/bundle.css');
      }
    }
  )],
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true
    },
    hmr: {
      clientPort: 8006
    }
  }
})
