import React from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';

export default function SoldOutModal({setShowSoldOutModal, showSoldOutModal, event}) {

    function handleClose() {
        setShowSoldOutModal(false)
    }
    
    return (
        <Modal
        show={showSoldOutModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>Sorry! <strong>{event.name.text}</strong> Has Just Sold Out</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            Please check back incase of further ticket releases
        </Modal.Body>
        <Modal.Footer>
        <Button  variant="secondary" onClick={handleClose}>Close</Button>         
        </Modal.Footer>
        </Modal>
    );
}

    

 
   
 