export class Constants {
    public static ImageboardName: string = 'hikka.ch';
    public static BackendURL: string = 'https://localhost:51621/api';
}

export interface BoardsInfo {
    Abbr: string;
    Name: string;
}

export interface ThreadInfo {
    Id: string;
    Title: string;
    Board: string;
    PostsCount: number;
    Posts: PostInfo[];
}

export interface PostInfo {
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
