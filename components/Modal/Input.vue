<template>
    <div class="field">
        <div class="control">
            <input :type="options.type" :placeholder="options.placeholder" required="required" class="input" v-model="inputContent" @input="$emit('update:inputContent', $event.target.value)">
        </div>
    </div>
</template>

<style>
    .modal-warning {
        color: #ff2400;
    }
    .modal-extra-p {
        margin-top: 0.5rem!important;
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 1.2rem;
    }
    .modal-checkbox {
        height: 1.2rem;
        width: 1.2rem;
        vertical-align: middle;
        margin: 0!important;
    }
    .modal-span-text {
        margin-left: 0.3rem;
    }
</style>

<script setup>
    const props = defineProps({
        options: {
            type: Object,
            default: {},
        },
        inputContent: String,
    });
</script>
