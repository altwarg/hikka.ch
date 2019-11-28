<template>
    <div id="board">
        <div id="content">
            <Thread :threadInfo="thread" />
        </div>

        <hr />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import Thread from './Thread.vue'
    import BoardsDescriptionControl from './controls/BoardsDescriptionControl.vue'

    @Component({
        components: {
            Thread,
            BoardsDescriptionControl
        }
    })
    export default class Board extends Vue {
        @Prop() private board!: string;
        @Prop() private thread!: Array<object>;
    }
</script>

<style scoped>
</style>
