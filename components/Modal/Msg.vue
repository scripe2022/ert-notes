<template>
    <p :class="{'modal-warning': (options.type=='warning')}">{{ options.content }}</p>
</template>

<style scoped>
    .modal-warning {
        color: #ff2400;
    }
</style>

<script setup>
    const props = defineProps({
        options: {
            type: Object,
            default: {},
        }
    });
</script>