import type { Ref } from 'vue'

export const useLocale = () => useState<string>('locale', () => useDefaultLocale().value)

export const useDefaultLocale = (fallback = 'en-US') => {
    const locale = ref(fallback)
    if (process.server) {
        const nuxtApp = useNuxtApp()
        const reqLocale = nuxtApp.ssrContext?.req.headers['accept-language']?.split(',')[0]
        if (reqLocale) {
            locale.value = reqLocale
        }
    }
    else if (process.client) {
        const navLang = navigator.language
        if (navLang) {
            locale.value = navLang
        }
    }
    return locale;
}