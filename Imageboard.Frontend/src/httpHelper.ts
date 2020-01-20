import axios from 'axios';
import { Constants, BoardsInfo, ThreadInfo, NewThreadDTO, NewPostDTO } from './common';

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

    public static async getBoardThreads(board: string) {
        return await http.get<ThreadInfo[]>(`/threads/all/${board}`);
    }

    public static async createNewThread(info: NewThreadDTO) {
        return await http.post<ThreadInfo>('/threads/new', info);
    }

    public static async getAllThreads() {
        return await http.get<ThreadInfo[]>('/threads/all');
    }

    public static async createNewPost(info: NewPostDTO, thread: string) {
        return await http.post<ThreadInfo>(`/threads/new/post/${thread}`, info);
    }
}
