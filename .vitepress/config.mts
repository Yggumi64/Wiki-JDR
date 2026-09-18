import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wiki_Vite",
  description: "My JDR Wiki",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Magie', link: '/magie' },
      { text: 'Cartes', link: '/cartes' },
      { text: 'Factions', link: '/factions/cultistes'}
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
