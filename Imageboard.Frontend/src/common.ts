export class Constants {
    public static BoardsInfo: Array<{ abbr: string, name: string }> = [
        { abbr: 'a', name: 'Anime' },
        { abbr: 'b', name: 'Random' },
        { abbr: 'd', name: 'Discussions' },
        { abbr: 'int', name: 'International' },
        { abbr: 'pr', name: 'Programming' },
        { abbr: 's', name: 'Software' },
        { abbr: 'po', name: 'Politics' },
        { abbr: 'vg', name: 'Video games' },
        { abbr: 'zog', name: 'Conspiration theories' },
    ];

    public static ImageboardName: string = 'Imageboard';
    public static BackendURL: string = 'https://localhost:51621/api';

    public static ThreadInfo: Array<{ id: string, datetime: string, isOP: boolean, message: string, no: number }> = [
        {
            id: '208372400',
            datetime: '25/11/19 (Mon) 22:13:07',
            isOP: true,
            message: 'Tpaдициoнных гoлoвных yбopoв тpeд.',
            no: 1,
        },
        {
            id: '208379002',
            datetime: '25/11/19 (Mon) 22:18:29',
            isOP: false,
            message: 'Сажа, скрыл',
            no: 2,
        },
        {
            id: '208380297',
            datetime: '25/11/19 (Mon) 22:18:31',
            isOP: false,
            message: 'bump',
            no: 3,
        },
        {
            id: '208380355',
            datetime: '25/11/19 (Mon) 22:19:07',
            isOP: true,
            message: 'Чего скрыл-то?',
            no: 4,
        },
        {
            id: '208380360',
            datetime: '25/11/19 (Mon) 22:19:57',
            isOP: false,
            message: 'оп, где суп?',
            no: 5,
        },
        {
            id: '208380297',
            datetime: '25/11/19 (Mon) 22:41:07',
            isOP: false,
            message: 'ГОЛОВА, ДАЙ ДЕНЕГ!',
            no: 6,
        },
        {
            id: '208380642',
            datetime: '25/11/19 (Mon) 23:01:01',
            isOP: false,
            message: 'wow, these russians are very aggressive... (¬_¬ )',
            no: 7,
        },
    ];
}
