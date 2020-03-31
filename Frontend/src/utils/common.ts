export const ImageboardName = 'hikka.ch';
export const BackendUrl = 'https://localhost:51621/api';

export type Board = Readonly<{
    Abbr: string;
    Name: string;
}>;

export type Thread = Readonly<{
    Id: string;
    Title: string;
    Board: string;
    PostsCount: number;
    Posts: Post[];
}>;

export type Post = Readonly<{
    Id: string;
    Name: string;
    DateTime: string;
    Message: string;
    No: number;
}>;

export type Boards = Readonly<Board[]>;
export type Threads = Readonly<Thread[]>;
