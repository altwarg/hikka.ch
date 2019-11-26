<template>
    <div id="app">
        <span id="boards-links-control">
            <BoardsLinksControl v-bind:boards="boards" />
        </span>
        <router-view />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import BoardsLinksControl from './components/controls/BoardsLinksControl.vue'
    import { Constants } from './common'

    @Component({
        components: {
            BoardsLinksControl
        }
    })
    export default class App extends Vue {
        get boards(): Array<{ abbr: string, name: string }> {
            return Constants.BoardsInfo;
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

    .row {
        margin-right: -15px;
        margin-left: -15px;
    }

    .col-md-12, .col-md-4, .col-xs-6, .col-sm-3 {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
    }

    .col-xs-6 {
        float: left;
        width: 50%;
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

    @media (min-width: 992px) {
        .col-md-12, .col-md-4 {
            float: left;
        }

        .col-md-12 {
            width: 100%;
        }

        .col-md-4 {
            width: 33.33333333%;
        }
    }

    @media (min-width: 768px) {
        .col-sm-3 {
            float: left;
            width: 25%;
        }
    }
</style>
