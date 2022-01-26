<template>
    <div class="db-boss">
        <div class="title-boss db-title" @click="linkTo">
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
    const linkTo = () => {
        document.getElementById(`${props.raidName}-${props.bossData}`).scrollIntoView({ behavior: "smooth" });
    }
</script>