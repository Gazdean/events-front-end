import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Image, Row, Col, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../Contexts/AuthContext";
import { fetchEventTickets, fetchIndividualEvent } from "../apiEventBriteCalls";
import SignUpModal from '../Components/SignUpModal'
import { handleFormatDate } from "../utils";
import ReturnToEventsButton from "../Components/ReturnToEventsButton";
import { MyEventsContext } from "../Contexts/MyEventsContext";

export default function IndividualEvent({ organizationId, images }) {
    const { myEvents } = useContext(MyEventsContext);

    const { event_id } = useParams();
    const { currentUser } = useAuth();
    const [event, setEvent] = useState([]);
    const [eventLoading, setEventLoading] = useState(false);
    const [dateTime, setDateTime] = useState({})
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [fetchEventError, setFetchEventError] = useState("")
    const [eventTickets, setEventTickets] = useState(null)
    const [alreadySignedUp, setAlreadySignedUp] = useState(false)


  useEffect(() => {
    handleFetchEvent()
  }, []);

  useEffect(() => {
    handleSetAlreadySignedUp()
  }, [event]);
  
  const handleShowSignUpModal = () => setShowSignUpModal(true);

  async function handleFetchEvent() {
    setEventLoading(true)
    setFetchEventError('')
    try {
      const responseEvent = await fetchIndividualEvent(event_id, organizationId);
      setEvent(responseEvent);
      setDateTime(handleFormatDate(responseEvent))
      const responseTickets = await fetchEventTickets(responseEvent.id)

      setEventTickets(responseTickets[0])
    } catch (error) {
        console.log(error);
        setFetchEventError('Failed to load event')
    } finally {
        setEventLoading(false)
    }
  }

  function handleSetAlreadySignedUp() {
    myEvents.includes(event.id) ? setAlreadySignedUp(true) : null
    console.log(dateTime)
  }


  return (
    <Container>
       {fetchEventError && <Alert variant="danger">{fetchEventError}</Alert>}
        {eventLoading ? <p>--Loading--</p>
            : eventTickets && event && (
                <Row className=''> 
                    <Col className= 'p-1 ml-0' >
                        <Image className= ''src={images[event.category_id].small} alt="generic event image"/>
                    </Col>
                    <Col>
                        <h1 style={{ fontSize: "80px" }}>{event.name.text}</h1>
                        <h2 >{dateTime.startDate}</h2>
                        <h2 >{dateTime.startTime} to {dateTime.endTime}</h2>
                        <p>{event.summary}</p>
                        {eventLoading? <p>--loading--</p> : eventTickets.free ? <p style={{color:"green"}}>free event</p> : eventTickets.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {eventTickets.cost.display}</p>}
                        {eventLoading? <p>--loading--</p> : <p style={{color:"green"}}>Tickets Available: {eventTickets.quantity_total < 5 && eventTickets.quantity_total > 0 ? 'Nearly Sold Out!!' : eventTickets.quantity_total == 0 ? 'Sold Out!!!!!' : eventTickets.quantity_total }</p> }
                        <ReturnToEventsButton string={"Return To Events"}/>
                        {currentUser && !alreadySignedUp ? <><Button className="ms-5" onClick={handleShowSignUpModal}>Sign Up</Button><SignUpModal setShowSignUpModal={setShowSignUpModal} showSignUpModal={showSignUpModal} event={event}/>   </> : null}
                    </Col>
                </Row>
            )
        }
        
    </Container>
)}
