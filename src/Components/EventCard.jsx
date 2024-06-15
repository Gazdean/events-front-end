import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleFormatDate } from '../utils'
import { fetchEventTickets } from '../apiEventBriteCalls'

export default function EventCard({event, images, eventsTickets, setEventsTickets, imagesLoading}) {

    const [dateInfo, setDateInfo] = useState({})
    const [currentEventTicket, setCurrentEventTicket] = useState({});
    const [eventTicketsError, setEventTicketsError] = useState("");
    const [eventsTicketsLoading, setEventsTicketsLoading] = useState(false);
   
    useEffect(() => {
        setDateInfo(handleFormatDate(event))  
        handleFetchEventsTickets() 
      }, [])

    async function handleFetchEventsTickets() {
      setEventsTicketsLoading(true);
      setEventTicketsError("");
      try { 
        // checking if ticket has already been fetched, so filters dont re-call fetchEventsTickets
        if (!eventsTickets.hasOwnProperty(event.id)) {
            const ticket = await fetchEventTickets(event.id);
            setEventsTickets((prevTickets) => ({...prevTickets, [event.id]: ticket[0]}))
            setCurrentEventTicket(ticket[0])
        } else {
            const ticket = eventsTickets[event.id]
            setCurrentEventTicket(ticket)
        }

      } catch (error) {
          console.log('Failed to fetch tickets', error)
          setEventTicketsError("Failed to fetch event tickets");
      } finally {
          setEventsTicketsLoading(false);
      }
    } 

  return (
    <> 
        <Col sm={2} className="w-100 border m-2 ms-0 p-3" variant="primary" style={{maxWidth:"400px"}}>
            <h2 >{event.name.text}</h2>  
            <h2 >{event.id}</h2>  
            <div>
              <p>Start: <strong>{dateInfo.startDate}</strong> at <strong>{dateInfo.startTime}</strong></p>
              <p>End: <strong>{dateInfo.endDate}</strong> at <strong>{dateInfo.endTime}</strong></p>
            </div>
            {imagesLoading ?
              <p>-- Image Loading --</p> : 
              <Image src={images[event.category_id]?.thumb} alt={`generic ${event?.name?.text} event picture`}/>
            }
            <p >{`${event.description.text.slice(0, 100)}.........`}</p>

            <Card className= "mb-3">
              {eventTicketsError ? 
                <Alert variant="danger">{eventTicketsError}</Alert> :
                eventsTicketsLoading ? <p> --tickets loading --</p> :
                // same issue with quantity-total as in individual event cant reduce to zero on eventbrite Api
                currentEventTicket.quantity_total <= 1 ? <Alert variant="danger">TICKETS SOLD OUT!!</Alert> :
                <>
                  {currentEventTicket?.free ? <p style={{color:"green"}}>free event</p> : currentEventTicket?.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {currentEventTicket?.cost?.display}</p>}
                  <p style={{color:"green"}}>Tickets Available: {currentEventTicket?.quantity_total < 5 && currentEventTicket?.quantity_total > 0 ? 'Nearly Sold Out!!' : currentEventTicket?.quantity_total == 0 ? 'Sold Out!!!!!' : currentEventTicket?.quantity_total }</p> 
                </>
              }
                </Card>
            <Link to={`event/${event.id}`}><Button variant="primary">More Info</Button></Link>
        </Col>      
    </>
  )
}
//  