import React, { useState, useEffect } from 'react';

import { Thread as ThreadItem, PageTopbar } from '../../components';
import { Thread, Boards } from '../../utils/common';
import { get } from '../../utils/api';

type Props = Readonly<{
    links: Boards;
    name: string;
    abbr: string;
    id: string;
}>;

export const ThreadPage: React.FC<Props> = ({ links, name, abbr, id }) => {
    const [fetched, setFetched] = useState<Thread | null>(null);

    useEffect(() => {
        get<Thread>(`threads/${id}`)
            .then((data) => setFetched(data))
            .catch((err) => console.error(err));
    }, [id, abbr]);

    return fetched ? (
        <>
            <PageTopbar abbr={abbr} inThread={true} links={links} name={name} />

            <hr />

            <ThreadItem info={fetched} inThread={true} />
        </>
    ) : <div />;
}
