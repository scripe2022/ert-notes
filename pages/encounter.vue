<template>
    <div class="encounter-page">
        <div class="encounter-navbar">
            <div class="encounter-navbar-menu">
                <span class="side-bar-icon" @click="sidebarShow = !sidebarShow">
                    <client-only>
                    <font-awesome-icon :icon="['fa', 'bars']" size="lg" />
                    </client-only>
                </span>
                <div class="side-bar-language">
                    <select class="select-language" @change="changeLanguage($event.target.value)">
                        <option value="cn">中文</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="encounter">
            <aside class="db-sidebar" v-if="sidebarShow">
                <EncounterVersion v-for="(item, index) in raidDataOrigin" :key="index" :versionData="item" @linkTo="linkTo"></EncounterVersion>
            </aside>
            <aside class="db-other" :class="{'with-margin': sidebarShow}">
                <div v-for="(item, index) in database" :key="index" class="boss-details">
                    <EncounterDataTable :spellData="item" :raidName="index"></EncounterDataTable>
                </div>
            </aside>
        </div>
    </div>
</template>

<style>
    .side-bar-language {
        height: 2.5rem;
        margin-right: 0.75rem;
    }
    .encounter-navbar-menu {
        display: flex;
        justify-content: space-between;
    }
    .encounter-navbar {
        background-color: #363636;
        position: fixed;
        top: 0;
        width: 100%;
        box-shadow: 0 0 16px rgb(0 0 0 / 28%);
        z-index: 2;
    }
    .boss-details:not(:last-child) {
        margin-bottom: 5rem;
    }
    .db-other {
        padding: 0 1rem 1rem 1rem;
        width: 100%;
    }
    .encounter {
        display: flex;
        margin-top: 2.5rem;
    }
    @media (min-width: 768px) {
        .with-margin {
            margin-left: 300px;
        }
    }

    .db-sidebar {
        width: 300px;
        background-color: #363636;
        height: 100vh;
        /* box-shadow: 0 0 16px rgb(0 0 0 / 28%); */
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
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faBars } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { useI18n } from 'vue-i18n'
    library.add(faBars);
    const { locale } = useI18n({useScope: 'global'});

    import config from '~/config/config.js';
    import raidDataOrigin from '~/assets/json/raidData.json';

    let sidebarShow = ref(false);

    let desktop;
    onMounted(() => {
        desktop = window.matchMedia('(min-width: 768px)');
        if (desktop.matches) sidebarShow.value = true;
    })

    const { data } = await useFetch(`${config.baseurl}/api/getspelldata`, {
        method: 'GET',
        params: {
            locale: locale.value,
        }
    });
    let database = ref(data.value);

    const linkTo = (args) => {
        const element = document.getElementById(args);
        const y = element.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({top: y, behavior: 'smooth'});
        if (!desktop.matches) sidebarShow.value = false;
    }

    const changeLanguage = async(args) => {
        const { data } = await useFetch(`${config.baseurl}/api/getspelldata`, {
            method: 'GET',
            params: {
                locale: args,
            }
        });
        database.value = data.value;
        locale.value = args;
    }
</script>