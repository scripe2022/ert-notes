<template>
    <p class="modal-extra-p">
        <input type="checkbox" class="modal-checkbox" v-model="checkboxValue" @change="callbackFun">
        <span class="modal-span-text" @click="checkboxClick">{{ options.content }}</span>
    </p>
</template>

<script setup>
    const props = defineProps({
        options: {
            type: Object,
            default: {},
        },
        checked: Boolean,
    });
    let checkboxValue = ref(props.checked);

    const emit = defineEmits([
        'update:checked',
    ]);

    const callbackFun = () => {
        emit('update:checked', checkboxValue.value);
    }

    const checkboxClick = () => {
        checkboxValue.value = !checkboxValue.value;
        callbackFun();
    }

</script>