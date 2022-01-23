import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    // ssr: false,
    meta: [
        { 
            charset: 'utf-8' 
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, user-scalable=0',
        },
    ],
    serverMiddleware: {
        '/server': '~/server/middleware'
    },
    css: [
        '~/assets/css/style.css'
    ]
})
