<template>
    <div id="description">
        <h1 class="text-center">{{ name }}</h1>
        <h2 class="text-center" v-if="name == imageboard">Welcome. Once again</h2>

        <hr />

        <div v-if="name == imageboard">
            <h3 class="text-center">What is {{ imageboard }}?</h3>
            <p>{{ imageboard }} is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music and photography. Users to not need to register an account before participating in the commutiny. Fell free to click on a board below that interests you and jump right in!</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { Constants } from '../../common'

    @Component
    export default class BoardsDescriptionControl extends Vue {
        @Prop() private name!: string;

        get imageboard(): string {
            return Constants.ImageboardName;
        }
    }
</script>

<style scoped>
</style>
