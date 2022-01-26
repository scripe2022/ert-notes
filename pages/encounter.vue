<template>
    <div class="encounter">
        <aside class="db-sidebar">
            <EncounterVersion v-for="(item, index) in raidDataOrigin" :key="index" :versionData="item"></EncounterVersion>
        </aside>
        <div class="db-other">
            <div v-for="(item, index) in data" :key="index">
                <EncounterDataTable :spellData="item" :raidName="index"></EncounterDataTable>
            </div>
        </div>
    </div>
</template>

<style>
    .db-other {
        padding: 1rem;
    }
    .encounter {
        display: flex;
    }
    .db-other {
        width: 100%;
        margin-left: 300px;
    }
    .db-content {
        max-width: 1000px;
        margin: 2rem auto 0 auto;
    }
    .db-sidebar {
        width: 300px;
        background-color: #363636;
        height: 100vh;
        box-shadow: 0 0 16px rgb(0 0 0 / 28%);
        padding: 1rem;
        box-sizing: border-box;
        overflow-y: scroll;

        position: fixed;
    }
    .db-title {
        padding-bottom: 2px;
        cursor: pointer;
        margin-bottom: 2px;
    }
    .db-title:hover {
        color: #06C;
    }
</style>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { locale } = useI18n({useScope: 'global'});
    
    import config from '~/config/config.js';
    import raidDataOrigin from '~/assets/json/raidData.json';

    const { data } = await useFetch(`${config.baseurl}/api/getspelldata`, {
        method: 'GET',
        params: {
            locale: locale.value,
        }
    });

</script>