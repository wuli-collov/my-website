import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端学习",
  description: "用于学习知识",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/Markdown/': [{
        text: 'Markdown学习',
        items: [
          { text: '概述', link: '/Markdown/guid' },
          { text: '开始使用', link: '/Markdown/use' }
        ]
      }],
      '/Docker/': [
        {
          text: 'Docker学习',
           items: [
          { text: '概述', link: '/Docker/' },
        ]
        }
      ],
      '/css/': [
        {
          text: 'css学习',
           items: [
          { text: '概述', link: '/css/' },
          { text: '视差滚动', link: '/css/parallaScrolling' },
          { text: 'iPhone SE 产品网页之 A13 晶片动画特效', link: '/css/A13' },
        ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
