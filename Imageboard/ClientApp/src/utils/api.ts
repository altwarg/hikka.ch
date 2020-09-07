import { Host } from './common';

const request = <T>(method: string, url: string, data?: FormData): Promise<T> => {
    const options: RequestInit = { method };

    if (data) {
        options.body = data;
    }

    return fetch(url, options)
        .then(async res => {
            if (res.ok) {
                return await res.json();
            }

            return Promise.reject(new Error('Not 200-OK response'));
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

export const get = <T>(url: string): Promise<T> =>
    request<T>('GET', `https://${Host}/${url}`);

export const post = <T>(url: string, data?: FormData): Promise<T> =>
    request<T>('POST', `https://${Host}/${url}`, data);
