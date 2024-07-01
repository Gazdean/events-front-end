import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import ShareMoreSocialsBody from './ShareMoreSocialsBody';

export default function ShareMoreSocialsModal({showMore, setShowMore, shareUrl, title, setShowShareSocialsModal}) {

    function handleClose() {
        setShowMore(false)
        setShowShareSocialsModal(false)
    }

    return (
        <Modal
        show={showMore}
        onHide={handleClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Share with your friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <ShareMoreSocialsBody shareUrl={shareUrl} title={title}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>         
        </Modal.Footer>
    </Modal>
    )
}
