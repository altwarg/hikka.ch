export class Constants {
    public static ImageboardName: string = 'hikka.ch';
    public static BackendURL: string = 'https://localhost:51621/api';
}

export interface Board {
    Abbr: string;
    Name: string;
}

export interface Thread {
    Id: string;
    Title: string;
    Board: string;
    PostsCount: number;
    Posts: Post[];
}

export interface Post {
    Id: string;
    Name: string;
    DateTime: string;
    Message: string;
    No: number;
}

export interface NewThreadDTO {
    Title: string;
    Board: string;
    Name: string;
    Message: string;
}

export interface NewPostDTO {
    Thread: string;
    Name: string;
    Message: string;
}
