<template>
    <div :class="{ 'post__op': no == 1, 'post__reply': no != 1 }" class="post__container">
        <div class="post__details">
            <span class="post__anon">Anonymous</span>
            <span class="post__is-op" v-if="isOP">#OP</span>
            <span class="post__time">{{ datetime }}</span>
            <span class="post__id">No. <span class="post__id-reply">{{ id }}</span></span>
        </div>
        <div class="post__attached">
            <figure class="post__attached-preview" v-if="no == 1">
                <figcaption class="post__attached-attr">
                    <a href="#" target="_blank" title="blank.jpg">blank.jpg</a>
                    <span class="post__attached-size">(40.0Kb, 591x453)</span>
                </figcaption>
                <a href="#" class="post__attached-link">
                    <img src="@/../public/blank.jpg" alt="591x453">
                </a>
            </figure>
        </div>
        <article class="post__message">
            {{ message }}
        </article>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    export default class PostItemControl extends Vue {
        @Prop() private id!: string;
        @Prop() private datetime!: string;
        @Prop() private isOP!: boolean;
        @Prop() private message!: string;
        @Prop() private no!: number;
    }
</script>

<style scoped lang="scss">
    .post__anon {
        cursor: pointer;
        margin-right: 5px;
    }

    .post__time {
        margin-right: 5px;
    }

    .post__id-reply {
        text-decoration: none;
        cursor: pointer;

        :hover {
            color: #3d54c3;
        }
    }

    .post__details {
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 5px;
    }

    .post__container {
        padding: 1px 3px 3px;
        margin: 0;
        word-break: break-word;
        word-wrap: break-word;
        margin-left: 20px;
    }

    .post__reply {
        display: inline-block;
        background: #dddddd;
        border: 1px solid #a9a9a6;
        border-radius: 3px;
    }

    .post__op {
        margin: 17px 36px;
    }

    .post__message {
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 40px;
        margin-inline-end: 40px;
    }

    .post__is-op {
        color: green;
        margin-right: 5px;
    }

    .post__attached {
        float: left;
    }

    .post__attached-multiple {
        width: 100%;
    }

    .post__attached-attr {
        font-size: .8em;
        margin-top: 4px;
    }

    .post__attached-size {
        display: block;
        font-size: 0.9em;
    }

    img {
        width: 220px;
        height: auto;
    }

    @media only screen and (max-width: 1600px) {
        .post__reply {
            max-width: 70vw;
        }
    }

    @media only screen and (max-width: 1300px) {
        .post__reply {
            max-width: 80vw;
        }
    }

    @media only screen and (max-width: 1023px) {
        .post__reply {
            max-width: 100vw;
        }
    }

    @media only screen and (max-width: 480px) {
        .post__container {
            margin: 0;
            padding: 0;
            width: 100%;
        }

        .post__details, .post__container {
            font-size: 1em;
        }
    }
</style>
