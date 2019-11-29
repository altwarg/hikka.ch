import Vue from 'vue'
import Vuex from 'vuex'
import boardsInfo from './modules/boardsInfo'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        boardsInfo
    }
});
