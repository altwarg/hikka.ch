import React, { useState, useEffect } from 'react';

import { Thread, PageTopbar } from '../../components';
import { Boards, Threads } from '../../utils/common';
import { post } from '../../utils/api';

type Props = Readonly<{
    links: Boards;
    name: string;
    abbr: string;
}>;

export const BoardPage: React.FC<Props> = ({ links, name, abbr }) => {
    const [fetched, setFetched] = useState<Threads | null>(null);

    useEffect(() => {
        let dto = {
            Board: abbr,
            LastPostsLimit: 3
        };

        post<Threads>('threads/all', dto)
            .then((data) => setFetched(data))
            .catch((err) => console.error(err));
    }, [abbr]);

    return fetched ? (
        <>
            <PageTopbar abbr={abbr} inThread={false} links={links} name={name} />

            <hr />

            {fetched.map((item, key) => (
                <Thread info={item} inThread={false} key={key} />
            ))}
        </>
    ) : <div />;
}
