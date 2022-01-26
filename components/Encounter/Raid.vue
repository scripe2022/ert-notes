<template>
    <div class="db-raid">
        <div class="title-raid db-title" @click="linkTo(`${raidData.name}-1`)">
            {{ $t('raid.' + raidData.name) }}
        </div>
        <div class="div-boss">
            <EncounterBoss v-for="(item, index) in raidData.boss" :key="index" :bossData="item" :raidName="raidData.name" @linkTo="linkTo"></EncounterBoss>
        </div>
    </div>
</template>

<style scoped>
    .title-raid {
        font-size: 1.5rem;
        padding-left: 2rem;
    }
</style>

<script setup>
    const props = defineProps({
        raidData: Object,
    });

    const emit = defineEmits([
        "linkTo",
    ])
    const linkTo = (args) => {
        emit("linkTo", args);
    }
</script>