<template>
    <div class="documentation">
        <div class="documentation-homepage">
            <DocSidebar></DocSidebar>
            <section class="one-column padding-column">
                <div class="columns">
                    <DocLeftColumn></DocLeftColumn>
                    <DocRightColumn></DocRightColumn>
                </div>
            </section>
        </div>

    </div>
</template>

<style>
    /* PC & PAD */
    @media (min-width: 768px) {
        .columns {
            display: flex;
        }
        .multi-columns {
            width: 50%;
        }
        .documentation-homepage {
            display: flex;
            justify-content: space-around;
        }
    }
    /* PHONE */
    @media (max-width: 767px) {
        .player-index {
            display: none;
        }
        .side-bar {
            width: 100%;
            padding-bottom: 1rem;
        }
    }

    .padding-column {
        padding: 2rem 0;
    }
    .documentation {
        background-color: #1C1C1C;
    }

    .column {
        padding: 0.75rem!important;
    }

    .multi-columns {
        margin: 0 auto;
        flex-shrink: 0;
        box-sizing: border-box;
    }
    
    .label {
        display: block;
    }

    .label:not(:last-child) {
        margin-bottom: 0.5em;
    }

    .note-editor {
        padding: 1rem;

        background-color: #363636;
    }

    .box {
        border-radius: 6px;
        color: #fff;
        display: block;
    }

    .ql-stroke {
        stroke: #fff!important;
    }
</style>
