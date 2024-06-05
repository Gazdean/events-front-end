import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function SignUpModal({setShow, show}) {
    const [counter, setCounter] = useState(25)

    const handleClose = () => setShow(false);

    useEffect(()=>{ 
        if(counter > 0 && show) {
            setTimeout(()=> {
                setCounter(prevCounter => prevCounter - 1);
            },1000)
        } else if(counter === 0) {
            handleCountDownZero()
        }
    },[counter, show])

    function handleCountDownZero() {
        setCounter(25)
        setShow(false)
    }

    function handleCloseModal() {
        setCounter(25)
        setShow(false)
    }

    

  
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up To Event</Modal.Title>
          </Modal.Header>
          <h2 style={{width:'80px', border: counter <= 10 ? '3px solid red': counter <= 20 ? '3px solid orange ' : '3px solid green', borderRadius: '30px'}}>{counter}</h2>
          <Modal.Body> 
            Your ticket will be held for 60 seconds<br/>If you close this form before completing your sign up your ticket will be released and you will need to sign up from the event screen again
          </Modal.Body>
          <Modal.Body>
            When you complete the event sign up<br/>The event will be added to 'my events' in your profile.
          </Modal.Body>
          <Button variant="primary">Complete Sign Up</Button>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
