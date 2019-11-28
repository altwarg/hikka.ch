<template>
    <div :class="{ 'post-op': no === 1, 'post-reply': no !== 1 }" class="post-container">
        <div class="post-details">
            <span class="post-anon">Anonymous</span>
            <span class="post-is-op" v-if="isOP">#OP</span>
            <span class="post-time">{{ datetime }}</span>
            <span class="post-id">
                No.

                <span class="post-id-reply">{{ id }}</span>
            </span>
        </div>
        <div class="post-message">
            {{ message }}
        </div>
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

<style scoped>
    .post-anon {
        cursor: pointer;
        position: relative;
        margin-right: 5px;
    }

    .post-id {
        padding-left: 5px;
    }

    .post-id-reply {
        text-decoration: none;
        cursor: pointer;
    }

    .post-id-reply:hover {
        color: #3d54c3;
    }

    .post-details {
        width: 100%;
    }

    .post-container {
        padding: 1px 3px 3px;
        margin: 0;
        word-break: break-word;
        word-wrap: break-word;
    }

    .post-reply {
        display: inline-block;
        background: #ddd;
        border: 1px solid #ddd;
        border-radius: 3px;
        position: relative;
        margin-left: 20px;
    }

    .post-message {
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 40px;
        margin-inline-end: 40px;
    }

    .post-is-op {
        color: green;
        padding: 0 8px;
    }
</style>
