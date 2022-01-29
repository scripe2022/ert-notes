<template>
    <section v-if="isSidebarShow" class="side-bar-column side-bar">
        <div class="note-navbar">
        </div>
        <div class="note-field">
            <draggable v-model="noteArray" @start="onStart" @end="onEnd" item-key="id" animation=150 forceFallback=false handle=".media-left">
                <template #item="{element, index}">
                    <DocBarNote :key="index" :index="index" :value="element" v-model="noteArray[index]" @noteSelect="noteSelect" @noteDelete="noteDelete" :highlight="currentSelected == index" ></DocBarNote>
                </template>
            </draggable>
        </div>
        <div class="media-left new-note">
            <span class="right-icon note-footer" @click="newNote">
                <font-awesome-icon :icon="['fa', 'folder-plus']" size="lg" />
                <span class="icon-text">{{ $t('view.newNote') }}</span>
            </span>
        </div>
    </section>
</template>

<style>
    .media-left.new-note {
        margin-top: 1rem;
    }
    .note-footer {
        /* display: flex; */
        justify-content: flex-start;
        margin: 0.5rem 0px 0px 1rem;
        font-size: 1.1rem;
    }
    .icon-text {
        margin-left: 0.5rem;
    }
    .side-bar {
        width: 350px;
        background-color: #363636;
        border-top: 1px solid #1C1C1C;
        border-bottom: 1px solid #1C1C1C;
        box-shadow: 0 0 16px rgb(0 0 0 / 28%);
    }
    @media (min-width: 768px) {
        .side-bar-column {
            width: 300px;
        }
    }
    @media (max-width: 767px) {
        .side-bar-column {
            width: 100%;
        }
    }
    .side-bar-column {
        margin: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
    }
    .note-field {
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
    }
</style>

<script setup>
    import draggable from 'vuedraggable';
    import { md5 } from '~/lib/md5.js';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    library.add(faFolderPlus);

    const isSidebarShow = useSidebarShow();
    
    const userState = useLogin();
    const currentPlayerList = useCurrentPlayerList();
    const editorJson = useEditorJson();
    const currentSelected = useCurrentSelected();
    currentSelected.value = '-1';
    const noteArray = useNoteArray();
    let drag = ref(false);
    let currentSelectedNid = '';

    const noteSelect = (args) => {
        currentSelected.value = args.toString();
        editorJson.value = noteArray.value[args].content;
        currentPlayerList.value = noteArray.value[args].players;
    }

    const noteDelete = (args) => {
        if (args == currentSelected.value) {
            currentSelected.value = '-1';
        }
        else if (args < currentSelected.value) {
            currentSelected.value = (parseInt(currentSelected.value) - 1).toString();
        }
        noteArray.value.splice(args, 1);
    }

    const newNote = () => {
        const hashValue = md5(userState.value.username + (new Date()).valueOf() + Math.random().toString());
        noteArray.value.push({
            name: 'new untitled',
            nid: hashValue,
            content: {"type":"doc","content":[{"type":"paragraph"}]},
            players: JSON.parse(JSON.stringify(userState.value.defaultPlayers)),
        });
    }

    const onStart = () => {
        drag.value = true;
        currentSelectedNid = noteArray.value[currentSelected.value].nid;
    }

    const onEnd = () => {
        drag.value = false;
        for (let i = 0; i < noteArray.value.length; ++i) {
            if (noteArray.value[i].nid == currentSelectedNid) {
                currentSelected.value = i;
                break;
            }
        }
    }
</script>