import React, { useState } from 'react';
import { Figure, Modal } from 'react-bootstrap';

import './styles.scss';

type Props = Readonly<{
    id: string;
}>;

export const Attached: React.FC<Props> = ({ id }) => {
    const [showFull, setShowFull] = useState(false);

    const getReadbleSize = (bytes: number): string => {
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const sizes = [ 'B', 'KB', 'MB' ];
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }

    return (
        <>
            <Figure className="mr-3">
                <Figure.Image
                    src={`https://localhost:5001/posts/attachment/${id}`}
                    onClick={() => setShowFull(true)}
                    thumbnail
                />
                <Figure.Caption className="text-center">
                {/* ({getReadbleSize(info!.size)}) */}
            </Figure.Caption>
            </Figure>

            <Modal
                show={showFull}
                onHide={() => setShowFull(false)}
                centered
            >
                <Modal.Body>
                    <Figure className="mb-0">
                        <Figure.Image
                            src={`https://localhost:5001/posts/attachment/${id}`}
                            className="mb-0"
                            rounded
                        />
                    </Figure>
                </Modal.Body>
            </Modal>
        </>
    )
};
