<template>
    <div id="board">
        <div id="description">
            <h1 class="text-center">{{ board }}</h1>
        </div>

        <div id="content">
            Here must be some content
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    export default class Board extends Vue {
        @Prop() private board!: object;
    }
</script>

<style scoped>
</style>
