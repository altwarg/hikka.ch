import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faUnderline,
    faStrikethrough,
    faChevronRight,
    faAngleDoubleRight,
    faSquare,
    faCode
} from '@fortawesome/free-solid-svg-icons';

type Props = Readonly<{
    onClick: (code: string) => void;
}>

export const MarkupPanel: React.FC<Props> = ({ onClick }) => (
    <ButtonGroup>
        <Button variant="light" onClick={(): void => onClick('[b][/b]')}><FontAwesomeIcon icon={faBold} /></Button>
        <Button variant="light" onClick={(): void => onClick('[i][/i]')}><FontAwesomeIcon icon={faItalic} /></Button>
        <Button variant="light" onClick={(): void => onClick('[u][/u]')}><FontAwesomeIcon icon={faUnderline} /></Button>
        <Button variant="light" onClick={(): void => onClick('[s][/s]')}><FontAwesomeIcon icon={faStrikethrough} /></Button>
        <Button variant="light" onClick={(): void => onClick('>')}><FontAwesomeIcon icon={faChevronRight} /></Button>
        <Button variant="light" onClick={(): void => onClick('>>')}><FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
        <Button variant="light" onClick={(): void => onClick('[spoiler][/spoiler]')}><FontAwesomeIcon icon={faSquare} /></Button>
        <Button variant="light" onClick={(): void => onClick('[code][/code]')}><FontAwesomeIcon icon={faCode} /></Button>
    </ButtonGroup>
);
