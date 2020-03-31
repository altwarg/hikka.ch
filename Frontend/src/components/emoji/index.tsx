import React from 'react';

type Props = Readonly<{
    symbol: string;
    label?: string;
    hidden?: boolean;
}>

export const Emoji: React.FC<Props> = ({ symbol, label, hidden }) => (
    <span
        role="img"
        aria-label={label ? label : ''}
        aria-hidden={hidden ? true : false}
    >
        {symbol}
    </span>
);
