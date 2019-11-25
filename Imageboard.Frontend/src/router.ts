import Vue from 'vue';
import Router from 'vue-router';
import { Constants } from './common';

Vue.use(Router);

export const Routes: Array<any> = [
    {
        path: '/',
        component: () => import('./components/Home.vue'),
        props: {
            boards: Constants.BoardsInfo,
        },
    },
    {
        path: '/a',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[0].name,
        },
    },
    {
        path: '/b',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[1].name,
        },
    },
    {
        path: '/d',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[2].name,
        },
    },
    {
        path: '/int',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[3].name,
        },
    },
    {
        path: '/pr',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[4].name,
        },
    },
    {
        path: '/s',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[5].name,
        },
    },
    {
        path: '/po',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[6].name,
        },
    },
    {
        path: '/vg',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[7].name,
        },
    },
    {
        path: '/zog',
        component: () => import('./components/Board.vue'),
        props: {
            board: Constants.BoardsInfo[8].name,
        },
    },
];

export default new Router({
    mode: 'history',
    base: '/',
    routes: Routes
});
