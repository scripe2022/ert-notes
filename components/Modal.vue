<template>
    <transition name="modal" @click="modalClose">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop="">
                    <section class="modal-body">
                        <div class="media">
                            <div class="media-content">
                                <slot></slot>
                            </div>
                        </div>
                    </section>

                    <div class="modal-footer">
                        <button class="modal-button" @click='modalClose'>{{ $t('view.cancel') }}</button>
                        <button class="modal-button is-primary" @click='modalDone'>{{ $t('view.done') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(74,74,74,.86);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    /* min-width: 320px; */
    max-width: 320px;
    /* width: 320px; */
    width: auto;
    margin: 0px auto;
    /* padding: 20px 30px; */
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #1C1C1C;
    display: block;
}

.media {
    align-items: flex-start;
    display: flex;
    text-align: left;
}

.media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    text-align: left;
}

.media-content p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-bottom: 0.5em;
    margin-top: 0;
}

.media-content .field {
    box-sizing: inherit;
    /* margin-bottom: 0px; */
}

.is-grouped {
    display: flex;
    justify-content: flex-start;
}

.media-content .has-flag {
    text-align: center;
}

.control {
    box-sizing: border-box;
    clear: both;
    font-size: 1rem;
    position: relative;
    /* text-align: center; */
    display: flex;
}

.input {
    width: 100%;
    background-color: #1C1C1C;
    border-radius: 4px;
    color: #F2F2F2;
    outline: none;

    align-items: center;
    border: 1px solid rgba(74, 74, 74, 0.5);
    display: flex;
    height: 2.5em;
    justify-content: flex-start;
    position: relative;
    vertical-align: top;
    font-size: 1rem;

    margin: 0;
    padding: calc(0.5em - 1px) calc(0.75em - 1px);
    box-sizing: border-box;

    cursor: text;
}

.icon {
    height: 1.5em;
    width: 1.5em;
    font-weight: 1000;
    line-height: 1.5;
}

.input:hover {
    border: 1px solid rgba(181, 181, 181, 0.5);
}

.input:active, .input:focus {
    border-color: #2b44ff;
    box-shadow: 0 0 0 0.125em rgb(43 68 255 / 25%);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-body {
    padding: 20px;
    padding: 20px 20px 10px 20px;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-footer {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 1px solid #4A4A4A;
    padding: 20px;
    background-color: #363636;
    display: flex;
    justify-content: flex-end;
}

.modal-button {
    background-color: #1C1C1C;
    border-color: #4A4A4A;
    border-width: 1px;
    color: #F2F2F2;
    cursor: pointer;
    padding: calc(0.5em - 1px) 1em;
    align-items: center;

    font-size: 1rem;
    height: 2.5em;
    border-radius: 4px;
    display: inline-flex;
}

.font-button {
    padding: calc(0.5em - 1px) calc(0.5em - 1px);
}

.modal-button:hover {
    border-color: #B5B5B5;
    color: #FFF;
}

.modal-button.is-primary:hover {
    background-color: #1E39FF;
    border-color: transparent;
    color: #FFF;
}

.modal-button.is-primary:active {
    background-color: #122EFF;
    border-color: transparent;
    color: #FFF;
}

.modal-button:not(:last-child) {
    margin-right: 0.5em;
}

.is-primary {
    background-color: #2b44ff;
    border-color: transparent;
    color: #fff;
}

.is-grouped>.control:not(:last-child) {
    margin-bottom: 0;
    margin-right: 0.75rem;
}

</style>

<script setup>
    const { $t } = useNuxtApp();

    const emit = defineEmits([
        'modalClose',
        'modalDone',
    ]);

    const modalClose = () => {
        emit('modalClose');
    }

    const modalDone = () => {
        emit('modalDone');
    }
</script>
