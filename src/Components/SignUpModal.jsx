import React from 'react'
import Modal from 'react-bootstrap/Modal';
import ModalCalendarBody from './ModalCalendarBody';

export default function SignUpModal({setShowSignUpModal, showSignUpModal, event, signUpComplete}) {

  function handleClose() {
      setShowSignUpModal(false)
  }
  
  return (
    <>
      <Modal
        show={showSignUpModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {signUpComplete && <ModalCalendarBody event={event} showSignUpModal={showSignUpModal} handleClose={handleClose}/>}
      </Modal>
    </>
  );
}
