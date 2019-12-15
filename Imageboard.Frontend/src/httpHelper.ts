import axios from 'axios';
import { Constants, BoardsInfo, ThreadInfo } from './common';

const http = axios.create({
    baseURL: Constants.BackendURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export default class HttpHelper {
    public static async getBoardsInfo() {
        return await http.get<BoardsInfo[]>('/boards/getBoards');
    }

    public static async getThreadInfo() {
        return await http.get<ThreadInfo[]>('/boards/threadInfo');
    }
}
