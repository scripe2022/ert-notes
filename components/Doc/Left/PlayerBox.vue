<template>
    <div>
        <div class="groups">
            <div class="field full-width">
                <div class="field is-grouped">
                    <div class="control">
                        <button type="button" class="button modal-button is-primary" @click="loadFromWcl">{{ $t('view.importWcl') }}</button>
                    </div>
                </div>
            </div>
            <div class="field full-width">
                <label class="label">Player</label>
                <div class="field is-grouped">
                    <div class="control player-name-input">
                        <input class="input" v-model="playerName">
                    </div>
                    <div class="control">
                        <DocLeftPlayerBoxClassSelector v-model:classSelected="inputSpec" :index="parseInt('-1')"></DocLeftPlayerBoxClassSelector>
                    </div>
                    <div class="control">
                        <button type="button" class="button modal-button is-primary" @click="addPlayer">{{ $t('view.addPlayer') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <ClientOnly>
            <draggable v-model="players" @start="onStart" @end="onEnd" item-key="id" animation=150 forceFallback=false handle=".media-left">
                <template #item="{element, index}">
                    <DocLeftPlayerBoxItem :key="index" :index="index" :value="element" v-model:player="players[index]" @deletePlayer="deletePlayer"></DocLeftPlayerBoxItem>
                </template>
            </draggable>
            </ClientOnly>
        </div>
        <div class="end-groups" v-if="userState.isLogin && !userState.readonly">
            <div class="tooltip">
                <button type="button" class="button modal-button is-primary" @click="setDefault">{{ $t('view.setDefault') }}</button>
                <!-- <span class="tooltiptext">Set player information as default, and all new notes after that will be used automatically</span> -->
            </div>
            <div class="tooltip">
                <button type="button" class="button modal-button is-primary" @click="loadDefault">{{ $t('view.loadDefault') }}</button>
                <!-- <span class="tooltiptext">Load default player information</span> -->
            </div>
        </div>

        <Modal v-if="wclShow" @modalDone="wclDone" @modalClose="wclShow=false">
            <ModalMsg :options="{ type: 'default', content: $t('wcl.url')+':' }"></ModalMsg>
            <ModalInput :options="{ type: 'text', placeholder: '' }" v-model:inputContent="wclUrl"></ModalInput>
            <ModalMsg :options="{ type: 'warning', content: $t('wcl.invaid') }" v-if="urlInvalid"></ModalMsg>
        </Modal>

    </div>
</template>

<style>
    .full-width {
        width: 100%;
    }
    .player-name-input {
        width: 100%;
        max-width: 250px;
    }
    .player-class-select {
        min-width: 120px;
    }
    .tooltip {
        position: relative;
        display: inline-block;
        margin-right: 10px;
    }
    
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 200px;
        background-color: #06C;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
    
        position: absolute;
        top: 40px;
        right: 5px;
        z-index: 1;
    }
    
    .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .end-groups {
        display: flex;
        justify-content: flex-start;
    }
    .control.content {
        flex-wrap: wrap;
    }
    .left-icon {
        height: 1.5rem;
        width: 1.5rem;
    }
    .right-icon {
        height: 1.5rem;
        width: 1.5rem;
    }
    .player-item:not(:last-child) {
        margin-bottom: 2rem;
    }
    .block:not(:last-child) {
        margin-bottom: 2rem;
    }
    .block-player {
        margin-bottom: 2rem;
    }
    .field-body {
        display: flex;
    }
    .media {
        align-items: flex-start;
        display: flex;
        text-align: left;
    }

    @media (min-width: 768px) {
        .media-left {
            margin: auto 2.5rem auto 0px;
        }
    }
    @media (max-width: 767px) {
        .media-left {
            margin: auto 1rem auto 0px;
        }
    }
    .media-left {
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .player-item .media-content {
        display: flex;
    }
    .media-right {
        margin: auto 0 auto 1rem;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .groups:not(:last-child) {
        margin-bottom: 2rem;
    }
    .groups {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .select {
        display: block;
        position: relative;
    }
    select option {
        padding: 0.25em 0.5em;
        background-color: #1c1c1c;
    }

    select {
        background-color: #1c1c1c;
        height: 2.5rem;
        color: #FFF;
        border: 1px solid rgba(74, 74, 74, 0.5);
        border-radius: 4px;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        font-weight: 500;
    }
    select:hover {
        border: 1px solid rgba(181, 181, 181, 0.5);
    }
    select:focus, select:active {
        border-color: #2b44ff;
        box-shadow: 0 0 0 0.125em rgb(43, 68, 255 / 25%);
        outline: none;
    }
    input:focus, textarea:focus, select:focus{
        outline: none;
    }
    .input {
        font-weight: 500;
    }

</style>

<script setup>
    const { $showToast } = useNuxtApp();
    import draggable from 'vuedraggable';
    import axios from 'axios';
    import config from '~/config/config.js';
    import {useLoading} from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    let playerName = ref('');
    let inputSpec = ref('0');

    const players = useCurrentPlayerList();
    const currentSelected = useCurrentSelected();
    const noteArray = useNoteArray();
    const userState = useLogin();
    let drag = ref(false);

    const onStart = () => {
        drag.value = true;
    }

    const onEnd = () => {
        drag.value = false;
    }

    const addPlayer = () => {
        players.value.push({name: playerName.value, class: inputSpec.value});
        playerName.value = '';
    }

    const deletePlayer = (args) => {
        players.value.splice(args, 1);
    }

    const setDefault = () => {
        if (confirm('Set as default?')) {
            userState.value.defaultPlayers = JSON.parse(JSON.stringify(players.value));
            $showToast('Set successfully', 'success', 3000);
        }
    }

    const loadDefault = () => {
        if (confirm('Load from default?')) {
            players.value = JSON.parse(JSON.stringify(userState.value.defaultPlayers));
        }
    }

    let wclShow = ref(false);
    let wclUrl = ref('');
    let urlInvalid = ref(false);
    const loadFromWcl = () => {
        wclShow.value = true;
    }

    const wclDone = () => {
        urlInvalid.value = false;
        const url = wclUrl.value;
        let reportId = url.substring(url.lastIndexOf("/") + 1);
        const pos = reportId.indexOf('#');
        const reg = /^[0-9a-zA-Z]*$/g;
        if (pos >= 0) reportId = reportId.substring(0, pos);
        
        if (reg.test(reportId) && reportId.length==16) {
            const $loading = useLoading();
            const loader = $loading.show({
            });
            axios.post(`${config.baseurl}/server/wclplayers`, {
                    reportId: reportId,
                }, {
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                .then( response => {
                    loader.hide();
                    if (response.data.code == '200') {
                        players.value = [...players.value?players.value:[], ...response.data.players];
                        $showToast('Loading successfully!', 'success', 3000);
                        wclShow.value = false;
                        // for (let i = 0; i < response.data.players.length; ++i) {
                        //     players.value.push({name: playerName.value, class: inputSpec.value});
                        // }
                    }
                    else {
                        $showToast('Error Occurs', 'error', 3000);
                    }
                }).catch( error => {
                    loader.hide();
                    console.log(error);
                });
        }
        else {
            urlInvalid.value = true;
        }
    }


    watch(players, (newValue, oldValue) => {
        if (currentSelected.value != '-1') {
            noteArray.value[currentSelected.value].players = JSON.parse(JSON.stringify(players.value));
        }
    }, {deep: true});
</script>