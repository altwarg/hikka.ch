import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { RequestMiddleware } from '@/Middleware/RequestMiddleware'
import store from '../store'

@Module
export default class BoardsInfoModule extends VuexModule {
    boardsInfo: { abbr: string, name: string }[] = new Array<{ abbr: string, name: string }>();

    get boards() {
        return this.boardsInfo;
    }

    @Mutation
    updateBoardsInfo(data: []) : void {
        this.boardsInfo = data;
    }

    @Action({ commit: 'updateBoardsInfo' })
    async fetchDataFromBackend() {
        return await RequestMiddleware.getBoardsInfo();
    }
}
