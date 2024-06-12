import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { upDateMyEvents } from '../apiFirebaseCalls';
import { useAuth } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router';
import ModalCalendarBody from './ModalCalendarBody';
import ModalSignUpBody from './ModalSignUpBody';


export default function SignUpModal({setShowSignUpModal, showSignUpModal, event}) {
    const [counter, setCounter] = useState(25)
    const [signUpComplete, setSignUpComplete] = useState(false)

    const {currentUser} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{ 
        // if(counter > 0 && showSignUpModal) {
        //     setTimeout(()=> {
        //         setCounter(prevCounter => prevCounter - 1);
        //     },1000)
        // } else if(counter === 0) {
        //     handleClose()
        // }
    },[counter, showSignUpModal])

    function handleClose() {
        
        setShowSignUpModal(false)
        setTimeout(()=>{
           setCounter(25)
        }, 1000)
    }
    
    return (
      <>
        <Modal
          show={showSignUpModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          {!signUpComplete ? 
          <ModalSignUpBody setSignUpComplete={setSignUpComplete} event={event} showSignUpModal={showSignUpModal}  setShowSignUpModal={setShowSignUpModal}/>
           : 
          <ModalCalendarBody event={event} showSignUpModal={showSignUpModal} handleClose={handleClose}/>
          }
        </Modal>
      </>
    );
  }
