import axios from 'axios';
import { Constants } from '../common';

const http = axios.create({
    baseURL: Constants.BackendURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export class RequestMiddleware {
    public static async getBoardsInfo() {
        // await RequestMiddleware.timeout(5000);

        return await http.get('/boards/getBoards');
    }

    public static async getThreadInfo() {
        return await http.get('/boards/threadInfo');
    }

    // public static timeout(ms: number) {
    //     return new Promise(resolve => setTimeout(resolve, ms))
    // }
}
