<template>
    <div class="db-version">
        <div class="title-version">
            {{ $t('raid.' + versionData.name) }}
        </div>
        <div class="div-raid">
            <EncounterRaid v-for="(item, index) in versionData.raid" :key="index" :raidData="item"></EncounterRaid>
        </div>
    </div>
</template>

<style scoped>
    .title-version {
        font-size: 1.8rem;
        padding-left: 0;
        cursor: default;
    }
</style>

<script setup>
    const props = defineProps({
        versionData: Object,
    });
</script>