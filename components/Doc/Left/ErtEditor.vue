<template>
    <div class="block">
        <div class="box bar">
           <div class="toolbar" id="toolbar">
                <button class="button toolbar-button ql-skull" @click="wowmark('skull')"></button>
                <button class="button toolbar-button ql-cross" @click="wowmark('cross')"></button>
                <button class="button toolbar-button ql-circle" @click="wowmark('circle')"></button>
                <button class="button toolbar-button ql-star" @click="wowmark('star')"></button>
                <button class="button toolbar-button ql-square" @click="wowmark('square')"></button>
                <button class="button toolbar-button ql-triangle" @click="wowmark('triangle')"></button>
                <button class="button toolbar-button ql-diamond" @click="wowmark('diamond')"></button>
                <button class="button toolbar-button ql-moon" @click="wowmark('moon')"></button>
                <button v-on:click="timeSnippetShow=true" class="toolbar-text-button toolbar-button button">{{ $t('view.timeSnippet') }}</button>
                <button v-on:click="spellSnippetShow=true" class="toolbar-text-button toolbar-button button">{{ $t('view.spellSnippet') }}</button>
                <button v-on:click="spellOccurrenceShow=true" class="toolbar-text-button toolbar-button button">{{ $t('view.spellOccurrence') }}</button>
            </div>

            <ClientOnly>
            <div v-show="playerList && playerList.length>0" class="block player-show">
                <div class="field">
                    <div class="control content">
                        <a class="wow-text" v-for="(item, index) in playerList" :key="index" :style="{color: wowClassColor.color[item.class]}" @click="insertPlayer(index)">{{ item.name }}</a>
                    </div>
                </div>
            </div>
            </ClientOnly>
        </div>

        <div class="editor-container">
            <ClientOnly>
            <editor-content autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" :editor="editor"></editor-content>
            <BubbleMenu :editor="editor" v-if="editor" class="bubble-menu">
                <button @click="editor.chain().focus().unsetColor().run()" class="color-block" style="background-color: white"></button>
                <button v-for="(item, index) in setColor" :key="index" class="color-block"
                    @click="editor.chain().focus().setColor(item).run()"
                    :style="{'background-color': item}" />
            </BubbleMenu>
            </ClientOnly>
        </div>
        
        <Modal v-if="timeSnippetShow" @modalDone="timeSnippetDone" @modalClose="timeSnippetShow=false">
            <ModalMsg :options="{ type: 'default', content: $t('modal.timeSnippetEnterTime') }"></ModalMsg>
            <ModalInput :options="{ type: 'text', placeholder: 'e.g. 1:23' }" v-model:inputContent="timeSnippetTime"></ModalInput>
            <ModalMsg :options="{ type: 'default', content: $t('modal.timeSnippetEnterPhase') }"></ModalMsg>
            <ModalTab v-model:tabContent="timeSnippetPhase"></ModalTab>
        </Modal>

        <Modal v-if="spellSnippetShow" @modalDone="spellSnippetDone" @modalClose="spellSnippetShow=false">
            <ModalMsg :options="{ type: 'default', content: $t('modal.spellSnippetEnterId') }"></ModalMsg>
            <ModalInput :options="{ type: 'text', placeholder: 'e.g. 123456' }" v-model:inputContent="spellSnippetId"></ModalInput>
            <ModalMsg :options="{ type: 'default', content: $t('modal.spellSnippetEnterCast') }"></ModalMsg>
            <ModalTab v-model:tabContent="spellSnippetCast"></ModalTab>
        </Modal>

        <Modal v-if="spellOccurrenceShow" @modalDone="spellOccurrenceDone" @modalClose="spellOccurrenceShow=false">
            <ModalMsg :options="{ type: 'default', content: $t('modal.spellOccurrenceTime') }"></ModalMsg>
            <ModalInput :options="{ type: 'text', placeholder: 'e.g. 0:10' }" v-model:inputContent="spellOccurrenceTime"></ModalInput>
            <ModalMsg :options="{ type: 'default', content: $t('modal.condition')+':' }"></ModalMsg>
            <ModalSelect :options="{ data: [ {value:'SCC', show:$t('modal.SCC')}, {value:'SCS', show:$t('modal.SCS')}, {value:'SAA', show:$t('modal.SAA')}, {value:'SAR', show:$t('modal.SAR')} ] }" v-model:selectContent="selectContent"></ModalSelect>
            <ModalMsg :options="{ type: 'default', content: $t('modal.spellOccurrenceId') }"></ModalMsg>
            <ModalTab v-model:tabContent="spellOccurrenceId"></ModalTab>
            <ModalMsg :options="{ type: 'default', content: $t('modal.spellOccurrenceCast') }"></ModalMsg>
            <ModalTab v-model:tabContent="spellOccurrenceCast"></ModalTab>
        </Modal>
    </div>
</template>

<style>
    .color-block {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        border: none;
        margin: 2px;
        cursor: pointer;
    }
    .color-block:hover {
        opacity: 0.5;
    }
    .bubble-menu {
        display: flex;
        padding: 5px;
        border-radius: 6px;
        background-color: #363636;
    }
    .toolbar-text-button:hover {
        color: #06c;
    }
    p>img.ProseMirror-separator {
        width: 0!important;
    }
    .ProseMirror {
        padding: 12px 15px 12px 15px;
        font-size: 1.1rem;
        line-height: 1.42;
        font-weight: 400;
    }
    .ProseMirror>* {
        cursor: text;
    }
    .ProseMirror-focused {
        outline: none;
    }
    .ProseMirror p {
        display: block;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        white-space: break-spaces!important;
    }
    .editor-container {
        background-color: #1C1C1C;
        border-radius: 6px;
    }
    .button {
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        font-size: 1rem;
    }
    .toolbar {
        padding: 0.5rem 0;
        display: table;
    }
    .toolbar-button {
        background: none;
        border: none;
        cursor: pointer;
        float: left;
        height: 24px;
        padding: 3px 5px;
        width: 28px;
    }
    .toolbar-text-button {
        color: #FFF;
        width: auto !important;
    }
    .wow-text {
        cursor: pointer;
        margin: 0px 4px;
        line-height: 1.5rem;
        font-size: 1rem;
    }
    .wow-text:hover {
        filter: contrast(40%);
    }

    .wowmark-img {
        vertical-align: middle;
        -webkit-user-modify: read-write!important;
        -webkit-user-drag: none!important;
        user-select: all;
    }

    .player-show {
        background-color: #1C1C1C;
        padding: 0.5rem;
        border-radius: 6px;
    }
    .ql-text-button {
        color: #FFF;
        width: auto!important;
    }
    .bar {
        border: 1px solid #1c1c1c;
        padding: 0.5rem;
    }
    .ql-skull {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/skull.png)!important;
    }
    .ql-cross {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/cross.png)!important;
    }
    .ql-circle {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/circle.png)!important;
    }
    .ql-star {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/star.png)!important;
    }
    .ql-square {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/square.png)!important;
    }
    .ql-triangle {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/triangle.png)!important;
    }
    .ql-diamond {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/diamond.png)!important;
    }
    .ql-moon {
        background-image: url(https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/moon.png)!important;
    }
    .ql-skull, .ql-cross, .ql-circle, .ql-star, .ql-square, .ql-triangle, .ql-diamond, .ql-moon {
        background-size: 16px!important;
        background-position: center!important;
        background-repeat: no-repeat!important;
        position: relative;
        top: -1px;
        margin: 0;
    }
</style>

<script setup>
    const { $t } = useNuxtApp();
    import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
    import Image from '@tiptap/extension-image';
    import StarterKit from '@tiptap/starter-kit';
    import { Color } from '@tiptap/extension-color';
    import TextStyle from '@tiptap/extension-text-style'
    
    import wowClassColor from '~/assets/json/wowClassColor.json'
    import { useI18n } from 'vue-i18n'

    const playerList = useCurrentPlayerList();

    const setColor = [
        '#FF0000',
        '#00ff00',
        '#0000ff',
        '#ffff00',
        '#ff00ff',
        '#00ffff',
    ];

    const editorJson = useState('editorJson', () => ({}));
    const currentSelected = useCurrentSelected();
    const noteArray = useNoteArray();
    const single = useSingle();

    let editorChange = false;

    const editor = useEditor({
        content: single.value!=undefined ? editorJson.value : '',
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                HTMLAttributes: {
                    class: 'wowmark-img',
                },
            }),
            Color,
            TextStyle,
        ],
        autofocus: false,
        onUpdate({ editor }) {
            editorChange = true;
            editorJson.value = JSON.parse(JSON.stringify(editor.getJSON()));
            if (currentSelected.value != '-1') {
                noteArray.value[currentSelected.value].content = JSON.parse(JSON.stringify(editor.getJSON()));;
            }
            // emit('update:dynamicContent', editor.getJSON());
        }
    })

    const urlpre = 'https://kyeremal.oss-cn-hangzhou.aliyuncs.com/ertnotes/src/wowmark/';
    const wowmark = (args) => {
        editor.value.chain().focus().setImage({ src: `${urlpre}${args}.png` }).run();
    }

    const insertContent = (args) => {
        editor.value.chain().focus().insertContent(args).run();
    }

    const insertPlayer = (args) => {
        const str = `<span style="color: ${wowClassColor.color[playerList.value[args].class]}">${playerList.value[args].name}</span>`;
        insertContent(str);
        insertContent(' ');
    }

    // Time Snippet
    let timeSnippetShow = ref(false);
    let timeSnippetTime = ref('');
    let timeSnippetPhase = ref('0');

    const timeSnippetDone = () => {
        timeSnippetShow.value = false;
        const str = `{time:${timeSnippetTime.value}` + (timeSnippetPhase.value=='0' ? '' : `,p${timeSnippetPhase.value}`) + '} ';
        insertContent(str);
    }

    // Spell Snippet
    let spellSnippetShow = ref(false);
    let spellSnippetId = ref('');
    let spellSnippetCast = ref('0');

    const spellSnippetDone = () => {
        spellSnippetShow.value = false;
        const str = `<${spellSnippetCast.value}> {spell:${spellSnippetId.value}} `; 
        insertContent(str);
    }

    // Spell Occurrence
    let spellOccurrenceShow = ref(false);
    let spellOccurrenceTime = ref('');
    let spellOccurrenceId = ref('123456');
    let spellOccurrenceCast = ref('0');
    let selectContent = ref('SCC');

    const spellOccurrenceDone = () => {
        spellOccurrenceShow.value = false;
        const str = `{time:${spellOccurrenceTime.value},${selectContent.value}:${spellOccurrenceId.value}:${spellOccurrenceCast.value}} `;
        insertContent(str);
    }

    // watch
    watch(editorJson, (newValue, oldValue) => {
        if (!editorChange) {
            editor.value.chain().focus().setContent(newValue).run();
        }
        editorChange = false;
    }, {deep: true});

</script>