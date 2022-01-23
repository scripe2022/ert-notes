import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    // ssr: false,
    // modules: [
    //     // Using package name
    //     '@vueup/vue-quill'
    // ],
    // meta: {
    //     script: [
    //         { src: 'https://cdn.quilljs.com/1.3.6/quill.js' }
    //     ],
    //     link: [
    //         { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css' }
    //     ],
    // },
    serverMiddleware: {
        '/server': '~/server/middleware'
    },
    css: [
        '~/assets/css/style.css'
    ]
})
