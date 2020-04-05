import React from 'react';

type Props = Readonly<{
    children: JSX.Element[] | JSX.Element;
    selector: string;
}>;

export const ScrollInto: React.FC<Props> = ({ children, selector }) => {
    const scrollInfoView = () => {
        const el = document.querySelector(selector);
        el!.scrollIntoView();
    }

    return (
        <div className="d-inline-block" onClick={scrollInfoView}>{children}</div>
    )
};
