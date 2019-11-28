<template>
    <nav id="board-navigation" class="borderless">
        <strong>
            [
        </strong>
        <strong v-for="(abbr, index) in boardsAbbr" :key="index">
            <router-link :to="abbr" class="board-navigation__link" v-if="abbr !== '/'">{{ abbr }}</router-link>
            <span v-else> {{ abbr }} </span>
        </strong>
        <strong>
            ]
        </strong>

        <strong>
            [
        </strong>
        <strong>
            <router-link to="/" class="board-navigation__link">Home</router-link>
        </strong>
        <strong>
            ]
        </strong>
    </nav>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    export default class BoardsLinksControl extends Vue {
        @Prop() private boards!: Array<{ abbr: string, name: string, no: number }>;

        get boardsAbbr(): Array<string> {
            return this.intersperce(this.boards.map(item => item.abbr), '/');
        }

        public intersperce(arr: Array<string>, el: string): Array<string> {
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
    .board-navigation__link {
        display: inline;
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
