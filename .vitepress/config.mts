import { defineConfig } from 'vitepress'
// .vitepress/config.js


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wiki_Vite",
  description: "My JDR Wiki",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Magie', link: '/magie' },
      { text: 'Cartes', link: '/cartes' },
      { text: 'Frise Chronologique', link: '/story-time-line'}
    ],

    sidebar: [
      {
        text: 'Factions',
        items: [
          { text: '🛡️ Les Gardiens', link: '/factions/gardiens' },
          { text: '⚓ Les Navigateurs', link: '/factions/navigateurs' },
          { text: '🍃 Les Pacifistes', link: '/factions/pacifistes' },
          { text: '☀️ Le Royaume', link: '/factions/royaume' },
          { text: '🌑 Les Cultistes', link: '/factions/cultistes' }
        ]
      },
      {
        text: 'Campagne',
        items: [
          { text: 'Campagne', link: '/campagne/campagne' },
          { text: 'Lieux importants', link: '/campagne/places_description' },
          { text: 'Personnages', link: '/campagne/known_characters' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
