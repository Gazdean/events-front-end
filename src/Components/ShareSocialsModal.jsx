import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainShareSocialsBody from './MainShareSocialsBody';
import { Col, Row } from 'react-bootstrap';
import ShareMoreSocialsModal from './ShareMoreSocialsModal';

export default function ModalShareSocials({showShareSocialsModal, setShowShareSocialsModal, shareUrl, title}) {

    const [showMore, setShowMore] = useState(false)

    function handleClose() {
        setShowShareSocialsModal(false)
    }

    function handleShowMore() {
        setShowMore(true)
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
                <MainShareSocialsBody shareUrl={shareUrl} title={title}/>
                </Col>
                <Col>
                <Button  className='ms-3 mt-3' onClick={handleShowMore}>More</Button>
                <ShareMoreSocialsModal showMore={showMore} setShowMore={setShowMore} title={title} shareUrl={shareUrl} setShowShareSocialsModal={setShowShareSocialsModal}/> 
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>         
        </Modal.Footer>
    </Modal>
    )
}
