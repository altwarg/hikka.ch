import Vue from 'vue';
import Router from 'vue-router';
import { Constants } from './common';

Vue.use(Router);

export const Routes: any[] = [
    {
        name: Constants.ImageboardName,
        path: '/',
        component: () => import('./components/Home.vue'),
    },
    {
        name: 'Anime',
        path: '/a',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Anime',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Random',
        path: '/b',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Random',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Discussions',
        path: '/d',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Discussions',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'International',
        path: '/int',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'International',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Programming',
        path: '/pr',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Programming',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Software',
        path: '/s',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Software',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Politics',
        path: '/po',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Politics',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Video games',
        path: '/vg',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Video games',
            thread: Constants.ThreadInfo,
        },
    },
    {
        name: 'Conspiration theories',
        path: '/zog',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Conspiration theories',
            thread: Constants.ThreadInfo,
        },
    },
];

export default new Router({
    mode: 'history',
    base: '/',
    routes: Routes
});
