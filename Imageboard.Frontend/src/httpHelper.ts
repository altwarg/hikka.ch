import axios from 'axios';
import { Constants, Board, Thread, NewThreadDTO, NewPostDTO } from './common';

const http = axios.create({
    baseURL: Constants.BackendURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export default class HttpHelper {
    public static async getBoards() {
        return await http.get<Board[]>('/boards/getBoards');
    }

    public static async getBoardThreads(board: string) {
        return await http.get<Thread[]>(`/threads/all/${board}/limit/3`);
    }

    public static async createNewThread(info: NewThreadDTO) {
        return await http.post<Thread>('/threads/new', info);
    }

    public static async getAllThreads() {
        return await http.get<Thread[]>('/threads/all');
    }

    public static async createNewPost(info: NewPostDTO, thread: string) {
        return await http.post<Thread>(`/threads/new/post/${thread}`, info);
    }

    public static async getThreadById(id: string) {
        return await http.get<Thread>(`/threads/${id}`);
    }
}
