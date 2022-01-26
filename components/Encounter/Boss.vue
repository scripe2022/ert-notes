<template>
    <div class="db-boss">
        <div class="title-boss db-title" @click="linkTo(`${raidName}-${bossData}`)">
            {{ $t(`raid.${raidName}-${bossData}`) }}
        </div>
    </div>
</template>

<style scoped>
    .title-boss {
        font-size: 1rem;
        padding-left: 4rem;
    }
    .link-to-boss {
        text-decoration: none;
        color: #FFF;
    }
    .link-to-boss:hover {
        color: #06C;
        filter: contrast(100%);
    }
</style>

<script setup>
    const props = defineProps({
        bossData: String,
        raidName: String,
    });
    const emit = defineEmits([
        "linkTo",
    ])
    const linkTo = (args) => {
        emit("linkTo", args);
    }
</script>