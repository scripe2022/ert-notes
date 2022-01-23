<template>
    <div class="multi-columns column">
        <div class="level">
            <div class="level-items">
                <span class="level-items-title">{{ $t('view.create') }}</span>
            </div>
            <div class="level-items">
                <label class="level-items-label">{{ $t('view.template') }}: </label>
                <DocLeftTemplatesSelector v-model:templateChoose="templateChoose"></DocLeftTemplatesSelector>
            </div>
        </div>
        <div class="note-editor box">
            <div class="field">
                <label class="label">{{ $t('view.tactic') }}</label>
                <DocLeftErtEditor></DocLeftErtEditor>
            </div>
            <div class="box players">
                <div class="notification">
                    {{ $t('view.playerbox') }}
                </div>
                <DocLeftPlayerBox></DocLeftPlayerBox>
            </div>
        </div>
    </div>
</template>

<style>
    .field:not(:last-child) {
        margin-bottom: 0.75rem;
    }
    .players {
        padding: 1.25rem;
        background-color: #1C1C1C;
    }
    .notification {
        background-color: #363636;
        border-radius: 4px;
        padding: 1rem 2.5rem 1rem 1.5rem;
        position: relative;
    }

    .notification:not(:last-child) {
        margin-bottom: 1.5rem;
    }
</style>

<script setup>
    const { $t } = useNuxtApp();
    let templateChoose = ref('0');
</script>