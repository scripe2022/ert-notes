<template>
    <NuxtPage />
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { locale } = useI18n({useScope: 'global'});

    const language = useLocale();
    if (language.value == 'zh-CN') {
        locale.value = 'cn';
    }
    else {
        locale.value = 'en';
    }
</script>