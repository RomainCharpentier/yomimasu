import React from 'react';

import useAPIError from '../hooks/useAPIError';
import { Modal, Button } from 'react-bootstrap';

export function APIErrorNotification() {
    const { error, removeError } = useAPIError();

    return (
        <Modal
            show={!!error}
            data-testid="notification-modal"
            onHide={() => removeError()}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Erreur {error && error.status}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && error.message && <p>{error.message}</p>}
                <Button variant="danger" onClick={() => removeError()}>
                    Fermer
                </Button>
            </Modal.Body>
        </Modal>
    )
}