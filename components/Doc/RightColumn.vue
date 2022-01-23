<template>
    <div class="multi-columns column">
        <div class="level">
            <div class="level-items">
                <span v-if="(!userState.isLogin || currentSelected=='-1') && single == undefined" class="level-items-title">{{ $t('view.notePreview') }}</span>
                <input v-if="(userState.isLogin && currentSelected!='-1') || single != undefined" readonly="readonly" class="nid-input" :value="single==undefined ? noteArray[currentSelected].nid : single.nid">
                <button v-if="(userState.isLogin && currentSelected!='-1') || single != undefined" class="level-button is-primary modal-button" @click="copyUrl">{{ $t('view.copyUrl') }}</button>
            </div>
            <div class="level-items">
                <button class="level-button is-primary modal-button" @click="noteCopy">{{ $t('view.copyNote') }}</button>
                <button v-if="userState.isLogin && !userState.readonly" class="level-button is-primary modal-button" @click="noteSave">{{ $t('view.saveAll') }}</button>
            </div>
        </div>
        <div class="preview is-sticky">
            <DocRightNotePreview @updateNote="updateNote"/>
        </div>
    </div>
</template>

<style scoped>
    .nid-input {
        background-color: #1C1C1C;
        border-radius: 4px;
        outline: none;
        color: #FFF;
        cursor: text;
        border: 1px solid rgba(74, 74, 74, 0.5);
        width: 260px;
        padding: 0 5px;
        height: 2rem;
        margin-right: 0.5rem;
    }
    @media(max-width: 767px) {
        .nid-input {
            display: none;
        }
    }
</style>

<script setup>
    const { $showToast } = useNuxtApp();
    import axios from 'axios';
    import config from '~/config/config.js';

    const single = useSingle();

    const noteCopy = () => {
        navigator.clipboard.writeText(note);
        $showToast('Notes Copied!', 'success', 3000);
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(`${config.baseurl}/${noteArray.value[currentSelected.value].nid}`);
        $showToast('URL Copied!', 'success', 3000);
    }

    const currentSelected = useCurrentSelected();
    const userState = useLogin();
    const noteArray = useNoteArray();
    const noteSave = () => {
        axios.post(`${config.baseurl}/server/save`, {
                username: userState.value.username,
                defaultPlayers: userState.value.defaultPlayers,
                noteArray: noteArray.value,
            }, {
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then( response => {
                if (response.data.code == '200') {
                    $showToast('Saved!', 'success', 3000);
                }
            }).catch( error => {
                console.log(error);
            });
    }


    let note = '';
    const updateNote = (args) => {
        note = args;
    }
</script>