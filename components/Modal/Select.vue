<template>
    <div class="field">
        <div class="control">
            <select class="full-width" v-model="selectContent" @change="$emit('update:selectContent', $event.target.value)">
                <option v-for="(item, index) in options.data" :key="index" :value="item.value">{{ item.show }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        options: {
            type: Object,
            default: {},
        },
        selectContent: String,
    });
</script>