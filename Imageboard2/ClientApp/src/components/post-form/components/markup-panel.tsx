import React from 'react';
import { ButtonGroup, Button, FormControl } from 'react-bootstrap';
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
    textArea: FormControl<"textarea"> & HTMLTextAreaElement;
}>

export const MarkupPanel: React.FC<Props> = ({ textArea }) => {
    const onClick = (tag: string): void => {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;

        if (start === end) {
            if (tag !== '>>' && tag !== '>') {
                textArea.setRangeText(`[${tag}][/${tag}]`);
                textArea.selectionStart += tag.length + 2;
            } else {
                textArea.setRangeText(tag);
                textArea.selectionStart += tag.length;
            }

            textArea.selectionEnd = textArea.selectionStart;
        } else {
            if (tag !== '>>' && tag !== '>') {
                textArea.setRangeText(`[${tag}]${textArea.value.substring(start, end)}[/${tag}]`);
            } else {
                textArea.setRangeText(`${tag}${textArea.value.substring(start, end)}`);
            }
        }

        textArea.focus();
    }

    return (
        <ButtonGroup>
            <Button variant="light" onClick={() => onClick('b')}><FontAwesomeIcon icon={faBold} /></Button>
            <Button variant="light" onClick={(): void => onClick('i')}><FontAwesomeIcon icon={faItalic} /></Button>
            <Button variant="light" onClick={(): void => onClick('u')}><FontAwesomeIcon icon={faUnderline} /></Button>
            <Button variant="light" onClick={(): void => onClick('s')}><FontAwesomeIcon icon={faStrikethrough} /></Button>
            <Button variant="light" onClick={(): void => onClick('>')}><FontAwesomeIcon icon={faChevronRight} /></Button>
            <Button variant="light" onClick={(): void => onClick('>>')}><FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
            <Button variant="light" onClick={(): void => onClick('spoiler')}><FontAwesomeIcon icon={faSquare} /></Button>
            <Button variant="light" onClick={(): void => onClick('code')}><FontAwesomeIcon icon={faCode} /></Button>
        </ButtonGroup>
    );
};
