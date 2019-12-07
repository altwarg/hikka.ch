import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { RequestMiddleware } from '@/Middleware/RequestMiddleware'
import ThreadInfo from '@/DTO/ThreadInfo';

@Module
export default class BoardsInfoModule extends VuexModule {
    boardsInfo: { abbr: string, name: string }[] = new Array<{ abbr: string, name: string }>();
    threadInfo: ThreadInfo[] = new Array<ThreadInfo>();

    get boards() {
        return this.boardsInfo;
    }

    get threads() {
        return this.threadInfo;
    }

    @Mutation
    updateBoardsInfo(data: []) : void {
        this.boardsInfo = data;
    }

    @Mutation
    updateThreadInfo(data: []): void {
        this.threadInfo = data;
    }

    @Action({ commit: 'updateBoardsInfo' })
    async getBoardsInfo() {
        return await RequestMiddleware.getBoardsInfo();
    }

    @Action({ commit: 'updateThreadInfo' })
    async getThreadInfo() {
        return await RequestMiddleware.getThreadInfo();
    }
}
