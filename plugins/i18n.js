import {defineNuxtPlugin} from '#app'
import { createI18n, useI18n } from 'vue-i18n'
import * as zhCN from '~/locales/cn.json'
import * as enUS from '~/locales/en.json'

const messages = {
    'en': {
        ...enUS
    },
    'cn': {
        ...zhCN
    }
}

const i18n = createI18n({
    locale: 'en',
    messages,
    legacy: false,
})

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(i18n);
    nuxtApp.provide('t', (key) => 
        useI18n().t(key)
    );
})