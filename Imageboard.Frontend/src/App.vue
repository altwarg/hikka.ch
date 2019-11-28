<template>
    <div id="app">
        <span class="boards-links-control">
            <BoardsLinksControl :boards="boards" />
        </span>
        <div id="description">
            <BoardsDescriptionControl :name="this.$route.name" />
        </div>
        <router-view />
        <span class="boards-links-control">
            <BoardsLinksControl :boards="boards" v-if="!onHomePage" />
        </span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import BoardsLinksControl from './components/controls/BoardsLinksControl.vue'
    import BoardsDescriptionControl from './components/controls/BoardsDescriptionControl.vue'
    import { Constants } from './common'

    @Component({
        components: {
            BoardsLinksControl,
            BoardsDescriptionControl
        }
    })
    export default class App extends Vue {
        get boards(): Array<{ abbr: string, name: string }> {
            return Constants.BoardsInfo;
        }

        get onHomePage(): boolean {
            return this.$route.name == Constants.ImageboardName;
        }
    }
</script>

<style>
    body {
        padding-top: 10px;
        padding-bottom: 10px;
        font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }

    h1 {
        font-size: 36px;
    }

    h2 {
        font-size: 30px;
    }

    h3 {
        font-size: 24px;
    }

    .text-center {
        text-align: center;
    }

    .borderless {
        border: none;
    }

    .list-group {
        padding-left: 0;
        margin-bottom: 20px;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
    }

    .list-group-item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .list-group-item:last-child {
        margin-bottom: 0;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    a.list-group-item {
        color: #555;
    }

    a.list-group-item:hover, a.list-group-item:focus {
        color: #555;
        text-decoration: none;
        background-color: #f5f5f5;
    }

    #app {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: "." "." ".";
        grid-auto-rows: minmax(min-content, max-content);
    }

    .row {
        margin-right: -15px;
        margin-left: -15px;
    }
</style>
