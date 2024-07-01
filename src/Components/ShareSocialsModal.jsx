import React from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainShareSocialsBody from './MainShareSocialsBody';
import { Col, Row } from 'react-bootstrap';

export default function ModalShareSocials({showShareSocialsModal, setShowShareSocialsModal, eventTitle, shareUrl, title}) {

    function handleClose() {
        setShowShareSocialsModal(false)
    }   

    return (
        <Modal
        show={showShareSocialsModal}
        onHide={handleClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Share with your friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col xs={12}>
                <MainShareSocialsBody  eventTitle={eventTitle} shareUrl={shareUrl} title={title}/>
                </Col>
                <Col>
                <Button  className='ms-3 mt-3'>More</Button>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>         
        </Modal.Footer>
    </Modal>
    )
}
