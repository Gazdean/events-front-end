import React, { useEffect, useState } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useAuth } from "../Contexts/AuthContext";
import { fetchEventTicketClasses, fetchIndividualEvent } from "../apiEventBriteCalls";
import SignUpModal from '../Components/SignUpModal'
import { handleFormatDate } from "../utils";

export default function IndividualEvent({ organizationId, images }) {
    const { event_id } = useParams();
    const { currentUser } = useAuth();
    const [event, setEvent] = useState();
    const [loading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState()
    const [show, setShow] = useState(false);
    const [error, setError] = useState("")
    const [eventTickets, setEventTickets] = useState()


  useEffect(() => {
    handleFetchEvent()
  }, []);
  
    const handleShow = () => setShow(true);

  async function handleFetchEvent() {
    setLoading(true)
    try {
      const responseEvent = await fetchIndividualEvent(event_id, organizationId);
      setEvent(responseEvent);
      setDateTime(handleFormatDate(responseEvent))
      const responseTickets = await fetchEventTicketClasses(responseEvent.id)
      setEventTickets(responseTickets[0])
      console.log(eventTickets)
      
    } catch (error) {
        console.log(error);
        setError(error)
    } finally {
        setLoading(false)
    }
  }

  return (
    <Container>
       
        {loading ? (<p>--Loading--</p>) 
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
                        {loading? <p>--loading--</p> : eventTickets.free ? <p style={{color:"green"}}>free event</p> : eventTickets.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {eventTickets.cost.display}</p>}
                        {loading? <p>--loading--</p> : <p style={{color:"green"}}>Tickets Available: {eventTickets.quantity_total < 5 && eventTickets.quantity_total > 0 ? 'Nearly Sold Out!!' : eventTickets.quantity_total == 0 ? 'Sold Out!!!!!' : eventTickets.quantity_total }</p> }
                        {currentUser ? <><Button onClick={handleShow}>Sign Up</Button><SignUpModal setShow={setShow} show={show} />   </> : null}
                    </Col>
                </Row>
            )
        }
        
    </Container>
)}
