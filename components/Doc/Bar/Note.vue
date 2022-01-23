<template>
    <div class="note-title" :class="{ 'is-selected': highlight }">
        <div class="media-left">
            <span class="left-icon">
                <font-awesome-icon :icon="['fa', 'align-justify']" size="lg" />
            </span>
        </div>
        <div class="note-select" @click="noteOnclick">
            <span class="note-name note-name-span" v-if="!editing">{{ modelValue['name'] }}</span>
            <input ref="ninput" type="text" v-if="editing" v-model="modelValue['name']" class="note-name note-name-input" :class="{ 'is-editing': editing, 'is-input-edit': editing }" @keyup.enter="endEdit" @click.stop v-focus>
        </div>
        <div class="media-left" v-if="!editing">
            <span class="right-icon" @click="editNote">
                <font-awesome-icon :icon="['fa', 'edit']" size="lg" />
            </span>
        </div>
        <div class="media-left" v-if="editing">
            <span class="right-icon" @click="endEdit">
                <font-awesome-icon :icon="['fa', 'check']" size="lg" />
            </span>
        </div>
        <div class="media-left">
            <span class="right-icon" @click="deleteNote">
                <font-awesome-icon :icon="['fa', 'trash-alt']" size="lg" />
            </span>
        </div>
    </div>
</template>

<style>
    .note-name-input {
        border: none;
        background: inherit;
        color: #FFFFFF;
        cursor: inherit;
        width: 70%;
    }
    .note-name-span {
        display: inline-flex;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 200px;
        width: 100%;
    }
    .is-input-edit {
        border-bottom: 1px solid #ffffff;
    }
    .note-name {
        line-height: 2.5rem;
        font-size: 1.2rem;
    }
    .note-name.is-editing {
        cursor: text;
    }
    .note-title {
        display: flex;
    }
    .note-title .media-left {
        margin-left: 1rem;
        margin-right: 0;
    }
    .note-title .media-left:last-child {
        margin-right: 1rem;
    }
    .note-select {
        padding: 0 1rem;
        cursor: pointer;
        flex: 1;
    }
    .note-select:hover {
        color: #06C;
    }
    .is-selected {
        background-color: #1C1C1C;
    }
    .is-selected .note-select:hover {
        color: #FFFFFF;
    }
</style>

<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faAlignJustify, faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    library.add(faAlignJustify)
    library.add(faEdit)
    library.add(faTrashAlt)
    library.add(faCheck)

    let editing = ref(false);
    const props = defineProps({
        index: Number,
        modelValue: Object,
        highlight: Boolean,
    })
    // console.log(props.modelValue);
    const emit = defineEmits([
        'noteSelect',
        'noteDelete'
    ])

    const vFocus = {
        mounted: (el) => {
            el.focus();
            el.select();
        }
    }

    const noteOnclick = () => {
        if (!props.highlight) {
            emit('noteSelect', props.index);
        }
    };

    const editNote = () => {
        editing.value = true;
    }

    const endEdit = () => {
        editing.value = false;
    }

    const deleteNote = () => {
        if (confirm('Want to delete')) {
            emit('noteDelete', props.index);
        }
    }
</script>
