export const ImageboardName = 'hikka.ch';
export const BackendUrl = 'https://localhost:51621/api';

export type Board = {
    Abbr: string;
    Name: string;
}

export type Thread = {
    Id: string;
    Title: string;
    Board: string;
    PostsCount: number;
    Posts: Post[];
}

export type Post = {
    Id: string;
    Name: string;
    DateTime: string;
    Message: string;
    No: number;
}
