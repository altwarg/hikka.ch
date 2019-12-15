export class Constants {
    public static ImageboardName: string = 'Hikka.ch';
    public static BackendURL: string = 'https://localhost:51621/api';
}

export interface BoardsInfo {
    abbr: string;
    name: string;
}

export interface ThreadInfo {
    id: string;
    datetime: string;
    message: string;
    no: number;
}
