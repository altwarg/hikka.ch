<template>
    <div class="thread">
        <div v-bind:class="{ 'thread-oppost': post.no === 1, 'thread-post': post.no !== 1 }" v-for="post in threadInfo" v-bind:key="post.no">
            <PostItemControl v-bind:id="post.id" v-bind:datetime="post.datetime" v-bind:isOP="post.isOP" v-bind:message="post.message" v-bind:no="post.no" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import PostItemControl from './controls/PostItemControl.vue'

    @Component({
        components: {
            PostItemControl
        }
    })
    export default class Thread extends Vue {
        @Prop() private threadInfo!: Array<object>;
    }
</script>

<style scoped>
    .thread-oppost {
        margin-bottom: 5px;
    }

    .thread-post {
        margin: 4px 0 4px 0px;
        overflow: visible;
    }
</style>
