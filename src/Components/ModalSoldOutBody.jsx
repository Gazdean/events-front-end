import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';

export default function ModalSoldOutBody() {
    const navigate = useNavigate()

    function handleClose() {
        navigate('/')
    }   
    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title>Sorry! This Event Has Just Sold Out</Modal.Title>
        </Modal.Header>
      <Modal.Body> 
        Please check back incase of further ticket releases
      </Modal.Body>
      <Modal.Footer>
        <Button  variant="secondary" onClick={handleClose}>Close</Button>         
      </Modal.Footer>
      </>
    )
}