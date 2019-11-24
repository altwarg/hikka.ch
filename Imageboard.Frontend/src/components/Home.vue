<template>
    <div class="home">
        <span id="boards-links-control">
            <BoardsLinksControl v-bind:boards="boardsInfo" />
        </span>
        <div id="content">
            <h1>{{ msg }}</h1>
            <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import BoardsLinksControl from './controls/BoardsLinksControl.vue'
    import { Constants } from '../common';

    @Component({
        components: {
            BoardsLinksControl
        }
    })

    export default class Home extends Vue {
        @Prop() private msg!: string;
        @Prop() private boardsInfo: Array<{ abbr: string, name: string }> = Constants.BoardsInfo;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
