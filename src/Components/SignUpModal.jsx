import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { upDateMyEvents } from '../apiFirebaseCalls';
import { useAuth } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router';


export default function SignUpModal({setShow, show, event}) {
    const [counter, setCounter] = useState(25)
    const {currentUser} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{ 
        // if(counter > 0 && show) {
        //     setTimeout(()=> {
        //         setCounter(prevCounter => prevCounter - 1);
        //     },1000)
        // } else if(counter === 0) {
        //     handleClose()
        // }
    },[counter, show])

    function handleClose() {
        
        setShow(false)
        setTimeout(()=>{
           setCounter(25)
        }, 1000)
    }

    async function handleSignUp() {
      try {
        const eventData = event.id
        await upDateMyEvents(currentUser.email, eventData)
        navigate("/profile")
      } catch(error) {
        console.log(error)
      }
    }
    console.log()

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
          <h2>{counter}</h2>
          <Modal.Body> 
            Your ticket will be held for 60 seconds<br/>If you close this form before completing your sign up your ticket will be released and you will need to sign up from the event screen again
          </Modal.Body>
          <Modal.Body>
            When you complete the event sign up<br/>The event will be added to 'my events' in your profile.
          </Modal.Body>
          <Button variant="primary" onClick={handleSignUp}>Complete Sign Up</Button>
          <Modal.Footer>
            <Button diasble={`${!show}`} variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
