import Vue from 'vue';
import Router from 'vue-router';
import { Constants } from './common';

Vue.use(Router);

export const Routes: Array<any> = [
    {
        name: Constants.ImageboardName,
        path: '/',
        component: () => import('./components/Home.vue'),
        props: {
            boards: Constants.BoardsInfo,
        },
    },
    {
        name: 'Anime',
        path: '/a',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[0].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Random',
        path: '/b',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[1].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Discussions',
        path: '/d',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[2].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'International',
        path: '/int',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[3].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Programming',
        path: '/pr',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[4].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Software',
        path: '/s',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[5].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Politics',
        path: '/po',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[6].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Video games',
        path: '/vg',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[7].name,
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Conspiration theories',
        path: '/zog',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[8].name,
            thread: Constants.ThreadInfo,
        },
    },
];

export default new Router({
    mode: 'history',
    base: '/',
    routes: Routes
});
