import React, { useState } from 'react';
import { Figure, Modal } from 'react-bootstrap';

import './styles.scss';

type Props = Readonly<{
    size: string;
    width: number;
    height: number;
    source: string;
}>;

export const Attached: React.FC<Props> = ({ size, width, height, source }) => {
    const [showFull, setShowFull] = useState(false);

    return (
        <>
            <Figure className="mr-3">
                <Figure.Image
                    alt={`${width}x${height}`}
                    src={source}
                    onClick={() => setShowFull(true)}
                    thumbnail
                />
                <Figure.Caption className="text-center">
                    ({size}, {width}x{height})
            </Figure.Caption>
            </Figure>

            <Modal
                show={showFull}
                onHide={() => setShowFull(false)}
                centered
            >
                <Modal.Body className="p-0">
                    <Figure className="mb-0">
                        <Figure.Image
                            width={width}
                            height={height}
                            alt={`${width}x${height}`}
                            src={source}
                            className="mb-0"
                            rounded
                        />
                    </Figure>
                </Modal.Body>
            </Modal>
        </>
    )
};
