<template>
    <select required class="select player-class-select" v-bind:style="{color: wowClassColor.color[classSelected]}" v-model="classSelected" @change="$emit('update:classSelected', $event.target.value)">
        <!-- <option v-for="(item, index) in productList" :key="index" :value="item.id" v-bind:style="{color: item.color}" >{{ item.title }}</option> -->
        <option value=0 v-bind:style="{color: wowClassColor.color[0]}">{{ $t('wow.dk') }}</option>
        <option value=1 v-bind:style="{color: wowClassColor.color[1]}">{{ $t('wow.druid') }}</option>
        <option value=2 v-bind:style="{color: wowClassColor.color[2]}">{{ $t('wow.hunter') }}</option>
        <option value=3 v-bind:style="{color: wowClassColor.color[3]}">{{ $t('wow.mage') }}</option>
        <option value=4 v-bind:style="{color: wowClassColor.color[4]}">{{ $t('wow.monk') }}</option>
        <option value=5 v-bind:style="{color: wowClassColor.color[5]}">{{ $t('wow.paladin') }}</option>
        <option value=6 v-bind:style="{color: wowClassColor.color[6]}">{{ $t('wow.priest') }}</option>
        <option value=7 v-bind:style="{color: wowClassColor.color[7]}">{{ $t('wow.rogue') }}</option>
        <option value=8 v-bind:style="{color: wowClassColor.color[8]}">{{ $t('wow.shaman') }}</option>
        <option value=9 v-bind:style="{color: wowClassColor.color[9]}">{{ $t('wow.warlock') }}</option>
        <option value=10 v-bind:style="{color: wowClassColor.color[10]}">{{ $t('wow.warrior') }}</option>
        <option value=11 v-bind:style="{color: wowClassColor.color[11]}">{{ $t('wow.dh') }}</option>
    </select>
</template>

<script setup>
    import wowClassColor from '~/assets/json/wowClassColor.json'

    const props = defineProps({
        classSelected: String,
        index: Number,
    });
</script>
