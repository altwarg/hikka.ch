export const ImageboardName = 'hikka.ch';
export const Host = window.location.host;

export type Board = Readonly<{
    abbr: string;
    name: string;
}>;

export type Thread = Readonly<{
    id: string;
    title: string;
    board: string;
    postsCount: number;
    posts: Post[];
}>;

export type Post = Readonly<{
    id: string;
    name: string;
    dateTime: string;
    message: string;
    no: number;
    attachment: string;
}>;

export type Boards = Readonly<Board[]>;
export type Threads = Readonly<Thread[]>;

export enum FetchAction {
    get,
    update,
    submit,
}
