<template>
    <div id="home">
        <div id="description">
            <h1 class="text-center">{{ imageboard }}</h1>
            <h2 class="text-center">Welcome. Once again</h2>

            <hr />

            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-center">What is {{ imageboard }}?</h3>
                    <p>{{ imageboard }} is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music and photography. Users to not need to register an account before participating in the commutiny. Fell free to click on a board below that interests you and jump right in!</p>
                </div>
            </div>
        </div>

        <div id="content">
            <hr />

            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-center">Boards</h3>
                    <ul class="list-group row">
                        <li class="list-group-item col-xs-6 col-sm-3 col-md-4 borderless" v-for="(board, index) in boards" v-bind:key="index">
                            <strong>
                                <router-link v-bind:to="board.abbr">/{{ board.abbr }} - {{ board.name }}</router-link>
                            </strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { Constants } from '../common'

    @Component
    export default class Home extends Vue {
        @Prop() private boards!: Array<{ abbr: string, name: string }>;

        get imageboard(): string {
            return Constants.ImageboardName;
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #337ab7;
    }

    a:hover, a:focus {
        color: #23527c;
        text-decoration: underline;
    }

    a:focus {
        outline: thin dotted;
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }
</style>
