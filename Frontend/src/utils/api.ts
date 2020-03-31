import { BackendUrl } from './common';

const request = <T>(method: string, url: string, data?: unknown): Promise<T> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    const options: RequestInit = {
        method,
        headers,
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export const get = <T>(url: string): Promise<T> =>
    request<T>('GET', `${BackendUrl}/${url}`);

export const post = <T>(url: string, data?: unknown): Promise<T> =>
    request<T>('POST', `${BackendUrl}/${url}`, data);
