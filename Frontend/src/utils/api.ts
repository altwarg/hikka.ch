import axios from 'axios';
import { Constants, Board, Thread, NewThreadDTO, NewPostDTO, GetThreadsDTO } from './common';

const http = axios.create({
    baseURL: Constants.BackendUrl,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export default class Api {
    public static async getBoards() {
        return await http.get<Board[]>('/boards/all');
    }

    public static async getBoardThreads(info: GetThreadsDTO) {
        return await http.post<Thread[]>('/threads/all/', info);
    }

    public static async createNewThread(info: NewThreadDTO) {
        return await http.post<Thread>('/threads/new', info);
    }

    public static async getAllThreads() {
        return await http.get<Thread[]>('/threads/all');
    }

    public static async createNewPost(info: NewPostDTO) {
        return await http.post<Thread>('/posts/new/', info);
    }

    public static async getThreadById(id: string) {
        return await http.get<Thread>(`/threads/${id}`);
    }
}
