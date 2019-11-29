import axios from 'axios';
import { Constants } from '../common';

const http = axios.create({
    baseURL: Constants.BackendURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export class RequestMiddleware {
    public static async getBoardsInfo(): Promise<Array<{ abbr: string, name: string }>> {
        const response = await http.get('/boards');
        return response.data;
    }
}
