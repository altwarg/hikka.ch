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
        },
    },
    {
        name: 'Random',
        path: '/b',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Random',
        },
    },
    {
        name: 'Discussions',
        path: '/d',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Discussions',
        },
    },
    {
        name: 'International',
        path: '/int',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'International',
        },
    },
    {
        name: 'Programming',
        path: '/pr',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Programming',
        },
    },
    {
        name: 'Software',
        path: '/s',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Software',
        },
    },
    {
        name: 'Politics',
        path: '/po',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Politics',
        },
    },
    {
        name: 'Video games',
        path: '/vg',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Video games',
        },
    },
    {
        name: 'Conspiration theories',
        path: '/zog',
        component: () => import('./components/Board.vue'),
        props: {
            board: 'Conspiration theories',
        },
    },
];

export default new Router({
    mode: 'history',
    base: '/',
    routes: Routes
});
