<template>
    <select required class="level-items-select" v-model="templateChoose" @change="onSelect($event.target.value)">
        <option v-for="(item, index) in templates" :key="index" :value="index" >{{ item.name }}</option>
    </select>
</template>

<script setup>
    import config from '~/config/config.js'

    const props = defineProps({
        templateChoose: String,
    });

    let templates = config.tactic;

    const onSelect = (args) => {
        console.log(args);
    }
</script>
