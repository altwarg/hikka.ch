export class Constants {
    public static ImageboardName: string = 'hikka.ch';
    public static BackendUrl: string = 'https://localhost:51621/api';
}

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

export type NewThreadDTO = {
    Title: string;
    Board: string;
    Name: string;
    Message: string;
}

export type NewPostDTO = {
    Thread: string;
    Name: string;
    Message: string;
}

export type GetThreadsDTO = {
    Board: string;
    LastPostsLimit: number;
}
