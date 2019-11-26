<template>
    <div id="board">
        <div id="description">
            <h1 class="text-center">{{ board }}</h1>
        </div>

        <div id="content">
            <Thread v-bind:threadInfo="thread" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import Thread from './Thread.vue'

    @Component({
        components: {
            Thread
        }
    })
    export default class Board extends Vue {
        @Prop() private board!: string;
        @Prop() private thread!: Array<object>;
    }
</script>

<style scoped>
</style>
