<template>
    <!-- <pre class="box is-white" v-text="JSON.stringify(editorJson)"></pre> -->
    <pre class="box is-white" v-text="preview"></pre>
</template>

<style>
    pre:not(:last-child) {
        margin-bottom: 2rem;
    }
    .preview.is-sticky {
        position: sticky;
        top: 42px;
    }
    .box.is-white {
        color: #0A0A0A;
        background-color: #FFF;
        padding: 1.25rem;
    }
    pre {
        margin: 0px;
        overflow: auto;
        overflow-y: hidden;
    }
</style>

<script setup>
    let preview = ref('');
    let previewHTML = ref('');
    const editorJson = useEditorJson();

    const emit = defineEmits([
        'updateNote',
    ]);

    const updatePreview = (newValue) => {
        let note = '';
        if (newValue.hasOwnProperty('content')) {
            const json = newValue.content;
            for (let i = 0; i < json.length; ++i) {
                if (!json[i].hasOwnProperty('type')) continue;
                if (json[i].type != 'paragraph') continue;
                if (!json[i].hasOwnProperty('content')) {
                    note += '\n';
                    continue;
                }
                const content = json[i].content;
                let line = '';
                for (let j = 0; j < content.length; j++) {
                    if (!content[j].hasOwnProperty('type')) continue;

                    if (content[j].type == 'text') {
                        if (content[j].hasOwnProperty('marks')) {
                            const rgbStr = content[j].marks[0].attrs.color;
                            if (rgbStr.match('#')) {
                                line += `|cff${rgbStr.substring(1, 7)}${content[j].text}|r`
                            }
                            else {
                                const commaReg = /(rgb\()|(\))/g;
                                const colorArray = rgbStr.replace(commaReg, '').split(',');
                                let res = '|cff'
                                for (var val of colorArray) {
                                    let num = parseInt(val).toString(16);
                                    res += (parseInt(num, 16) < 16) ? ('0' + num) : num;
                                }
                                line += res + content[j].text + '|r';
                            }
                        }
                        else {
                            line += content[j].text;
                        }
                    }
                    else if (content[j].type == 'image') {
                        const url = content[j].attrs.src;
                        const mark = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
                        line += `{${mark}}`;
                    }
                }
                note += line.match('///') ? '' : line + '\n';
            }
            preview.value = note;
        }
        emit('updateNote', note);
    }
    updatePreview(editorJson.value);

    watch(editorJson, (newValue, oldValue) => {
        updatePreview(newValue);
    }, {deep: true});
</script>
