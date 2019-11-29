<template>
    <div id="home">
        <div id="content">
            <hr />

            <div class="row">
                <div class="full-width">
                    <h3 class="text-center">Boards</h3>
                    <ul id="homepage__boards-list" class="list-group">
                        <li class="list-group-item homepage__board borderless" v-for="(board, index) in boards.data" :key="index">
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
    import { Component, Vue } from 'vue-property-decorator'
    import { mapGetters } from 'vuex';
    import { Constants } from '../common'
    import BoardsDescriptionControl from './controls/BoardsDescriptionControl.vue'

    @Component({
        components: {
            BoardsDescriptionControl
        },
        computed: mapGetters(['boards'])
    })
    export default class Home extends Vue {
        get imageboard(): string {
            return Constants.ImageboardName;
        }

        beforeMount() {
            this.$store.dispatch('fetchDataFromBackend');
        }
    }
</script>

<style scoped lang="scss">
    a {
        text-decoration: none;
        color: #337ab7;

        :hover, :focus {
            color: #23527c;
            text-decoration: underline;
        }

        :focus {
            outline: thin dotted;
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
        }
    }

    #homepage__boards-list {
        text-align: center;

        li {
            background-color: #eee;
        }
    }

    .homepage__board {
        position: relative;
        min-height: 1px;
        padding-right: 20px;
        padding-left: 20px;
        width: 15%;
        float: left;
    }
</style>
