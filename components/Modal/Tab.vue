<template>
    <div class="field modal-around is-grouped">
        <p class="control">
            <button type="button" class="modal-button is-primary font-button" @click="plus">
                <span class="icon">
                    <font-awesome-icon :icon="['fa', 'minus']" size="lg" />
                </span>
            </button>
        </p>
        <div class="control all-width">
            <input required="required" class="input has-flag" v-model="tabContentInt" @input="callbackFun">
        </div>
        <p class="control">
            <button type="button" class="modal-button is-primary font-button" @click="minus">
                <span class="icon">
                    <font-awesome-icon :icon="['fa', 'plus']" size="lg" />
                </span>
            </button>
        </p>
    </div>
</template>

<style>
    .modal-around.modal-around {
        justify-content: space-between;
    }
    .all-width {
        width: 100%;
    }
</style>

<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    library.add(faMinus)
    library.add(faPlus)

    const emit = defineEmits([
        'update:tabContent',
    ]);

    const props = defineProps({
        tabContent: String,
    });
    let tabContentInt = ref(parseInt(props.tabContent));

    const callbackFun = () => {
        emit('update:tabContent', tabContentInt.value.toString());
    }

    const plus = () => {
        tabContentInt.value>0 ? tabContentInt.value-=1 : tabContentInt.value;
        callbackFun();
    }

    const minus = () => {
        tabContentInt.value += 1;
        callbackFun();
    }
</script>
