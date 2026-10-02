import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'logo-512.png', 'masked-icon.svg'],
      manifest: {
        name: 'SDE Tracker',
        short_name: 'Tracker',
        description: 'Offline SDE Interview Preparation Tracker',
        theme_color: '#0f172a', // Matches your dark slate background
        background_color: '#f8fafc',
        display: 'standalone', // Makes it look like a native app without browser borders
        icons: [
    {
      src: '/logo-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable'
    },
    {
      src: '/logo-512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
      },
      workbox: {
        // This is the magic configuration that caches your entire UI for offline use
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
    ,
    tailwindcss()
  ]
});