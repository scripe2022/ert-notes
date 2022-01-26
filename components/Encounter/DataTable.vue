<template>
    <div class="db-content" :id="raidName">
        <div class="raid-name">
            <span>{{ $t(`raid.${raidName}`) + ` [${raidName}]` }}</span>
        </div>
        <div class="table-border">
            <div v-for="(item, index) in spellData" :key="index">
                <div class="full-row stage table-cell table-border">
                    <span>{{ item.tag }}</span>
                </div>
                <div class="full-row" v-for="(spell, index) in item.spell" :key="index">
                    <div class="row-id table-cell table-border">
                        <span class="column-id">{{ spell.spellid }}</span>
                    </div>
                    <div class="row-title table-cell table-border">
                        <span class="column-title">{{ spell.title }}</span>
                    </div>
                    <div class="row-content table-cell table-border">
                        <span>{{ spell.content }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .db-content {
        max-width: 1000px;
        margin: 2rem auto 0 auto;
    }
    .raid-name {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    .table-cell {
        padding: 10px;
    }
    .table-border {
        border: 2px solid #363636;
    }
    .full-row {
        display: flex;
    }
    .full-row:hover {
        /* font-weight: 700; */
        background-color: #262626;
    }
    .row-id {
        flex-basis: 10%;
        flex-shrink: 1;
    }
    .row-title {
        flex-basis: 20%;
        flex-shrink: 2;
    }
    .row-content {
        flex-basis: 70%;
        flex-shrink: 7;
    }
    .row-id, .row-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .column-id, .column-title {
        align-self: center;
    }
    /* .column-id {
        cursor: pointer;
    } */
    .stage {
        font-size: 1.3rem;
        font-weight: 400;
        justify-content: center;
    }
</style>

<script setup>
    const props = defineProps({
        spellData: Object,
        raidName: String,
    });
</script>