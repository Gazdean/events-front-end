// import React from 'react'
// import { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { upDateMyEvents } from '../apiFirebaseCalls';
// import { useAuth } from '../Contexts/AuthContext'
// import { useNavigate } from 'react-router';

// export default function ModalSignUpBody({setSignUpComplete, event, showSignUpModal, setShowSignUpModal}) {
//     const [counter, setCounter] = useState(25)
//     const {currentUser} = useAuth()

//     useEffect(()=>{ 
//         // if(counter > 0 && showSignUpModal) {
//         //     setTimeout(()=> {
//         //         setCounter(prevCounter => prevCounter - 1);
//         //     },1000)
//         // } else if(counter === 0) {
//         //     handleClose()
//         // }
//     },[counter, showSignUpModal])

//     function handleClose() {
        
//         setShowSignUpModal(false)
//         setTimeout(()=>{
//            setCounter(25)
//         }, 1000)
//     }
//     // move to individual
//     async function handleSignUp() {
//       setSignUpComplete(false)
//       try {
//         const eventData = event.id
//         await upDateMyEvents(currentUser.email, eventData)
//         setSignUpComplete(true)
//       } catch(error) {
//         console.log(error)
//       }
//     }

//   return (
//     <>
//         <Modal.Header closeButton>
//             <Modal.Title>Sign Up To Event</Modal.Title>
//             </Modal.Header>
//             <h2>{counter}</h2>
//             <Modal.Body> 
//                 Your ticket will be held for 60 seconds<br/>If you close this form before completing your sign up your ticket will be released and you will need to sign up from the event screen again
//             </Modal.Body>
//             <Modal.Body>
//                 When you complete the event sign up<br/>The event will be added to 'my events' in your profile.
//             </Modal.Body>
//             <Button variant="primary" onClick={handleSignUp}>Complete Sign Up</Button>
//             <Modal.Footer>
//                 <Button disable={!showSignUpModal ? 'true' : 'false'} variant="secondary" onClick={handleClose}>
//                 Close
//                 </Button>
            
//           </Modal.Footer>
//     </>
//   )
// }
