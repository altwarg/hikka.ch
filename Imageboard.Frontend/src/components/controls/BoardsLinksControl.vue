<template>
    <nav id="board-navigation" class="borderless">
        <strong>
            [
        </strong>
        <strong v-for="abbr in boardsAbbr">
            <a href="#" class="link-to-board" v-if="abbr !== '/'" >{{ abbr }}</a>
            <span v-else> {{ abbr }} </span>
        </strong>
        <strong>
            ]
        </strong>
    </nav>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class BoardsLinksControl extends Vue {
        @Prop() private boards!: Array<{ abbr: string, name: string }>;
        @Prop() private boardsAbbr: Array<string> = this.Intersperce(this.boards.map(item => item.abbr), '/');

        private Intersperce(arr: Array<string>, el: string): Array<string> {
            let res: Array<string> = [];
            let i: number = 0;

            if (i < arr.length) {
                res.push(arr[i++]);
            }

            while (i < arr.length) {
                res.push(el, arr[i++]);
            }

            return res;
        }
    }
</script>

<style scoped>
    .borderless {
        border: none;
    }

    .link-to-board {
        display: inline;
        text-decoration: none;
    }
</style>