<template>
    <div id="home">
        <div id="content">
            <hr />

            <div class="row">
                <div class="full-width">
                    <h3 class="text-center">Boards</h3>
                    <ul id="homepage-boards-list" class="list-group">
                        <li class="list-group-item homepage-board borderless" v-for="(board, index) in boards" :key="index">
                            <strong>
                                <router-link :to="board.abbr">/{{ board.abbr }} - {{ board.name }}</router-link>
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
    import BoardsDescriptionControl from './controls/BoardsDescriptionControl.vue'

    @Component({
        components: {
            BoardsDescriptionControl
        }
    })
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

    #homepage-boards-list {
        text-align: center;
    }

    .homepage-board {
        position: relative;
        min-height: 1px;
        padding-right: 20px;
        padding-left: 20px;
        width: 15%;
        float: left;
    }
</style>
