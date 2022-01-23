<template>
    <div class="player-item block-player">
        <article class="media">
            <div class="media-left">
                <span class="left-icon">
                    <font-awesome-icon :icon="['fa', 'align-justify']" size="lg" />
                </span>
            </div>
            <div class="media-content">
                <div>
                    <label class="player-index">Player</label>
                </div>
                <div class="field-body">
                    <div class="input-player-name player-name-input">
                        <input type="text" spellcheck="false" autocomplete="on" class="input" :value="player.name" v-bind:style="{color: specColor[player.class]}" @input="$emit('update:player', {name: $event.target.value, class: player.class})">
                    </div>
                    <div class="player-field">
                        <div class="control">
                            <DocLeftPlayerBoxClassSelector v-model:classSelected="player.class" :index="index"></DocLeftPlayerBoxClassSelector>
                        </div>
                    </div>
                </div>
            </div>
            <div class="media-right">
                <span class="right-icon" @click="$emit('deletePlayer', index)">
                    <font-awesome-icon :icon="['fa', 'times-circle']" size="lg" />
                </span>
            </div>
        </article>
    </div>
</template>

<style>
    .player-index {
        line-height: 2.5em;
        margin-right: 1rem;
    }
    .input-player-name {
        margin-right: 1rem;
    }
    .right-icon {
        cursor: pointer;
    }
    .right-icon:hover {
        color: #06C;
    }
    .field-body {
        justify-content: space-between;
    }
    .player-field {
        width: 50%;
    }
</style>

<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faAlignJustify, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    
    import wowClassColor from '~/assets/json/wowClassColor.json'

    library.add(faAlignJustify)
    library.add(faTimesCircle)

    const props = defineProps({
        index: Number,
        player: Object,
    });

    const specColor = wowClassColor.color;
</script>
