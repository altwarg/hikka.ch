import React from 'react';
import { Toast as BootstrapToast } from 'react-bootstrap';
import { ImageboardName } from '../../utils/common';

type Props = Readonly<{
    msg: string;
    show: boolean;
    onClose: () => void;
}>;

export const Toast: React.FC<Props> = ({ msg, show, onClose }) => (
    <div style={{ position: 'absolute', top: 50, right: 10 }}>
        <BootstrapToast show={show} onClose={onClose} autohide>
            <BootstrapToast.Header>
                <span className="font-weight-bold mr-auto">{ImageboardName}</span>
                <small>just now</small>
            </BootstrapToast.Header>
            <BootstrapToast.Body>{msg}</BootstrapToast.Body>
        </BootstrapToast>
    </div>
);
