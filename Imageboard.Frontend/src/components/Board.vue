<template>
    <div id="board">
        <div id="content">
            <Thread :threadInfo="threads.data" />
        </div>

        <hr />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import Thread from './Thread.vue'
    import BoardsDescriptionControl from './controls/BoardsDescriptionControl.vue'
    import { mapGetters } from 'vuex';

    @Component({
        components: {
            Thread,
            BoardsDescriptionControl
        },
        computed: mapGetters(['threads'])
    })
    export default class Board extends Vue {
        @Prop() private board!: string;

        beforeMount() {
            this.$store.dispatch('getThreadInfo');
        }
    }
</script>

<style scoped>
</style>
