import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleFormatDate, isEventOld } from '../utils'
import { fetchEventTickets } from '../apiEventBriteCalls'

export default function EventCard({event, images, imagesLoading, eventsTickets, setEventsTickets}) {

    const [dateInfo, setDateInfo] = useState({})
    const [pastEvent, setpastEvent] = useState(false);
    const [currentEventTicket, setCurrentEventTicket] = useState({});

    const [eventTicketsError, setEventTicketsError] = useState("");
    const [eventsTicketsLoading, setEventsTicketsLoading] = useState(false);
   
   
    useEffect(() => {
      const startDateString = event.start.utc 
      const endDateString = event.end.utc
      setDateInfo(handleFormatDate(startDateString, endDateString))
      setpastEvent(isEventOld(startDateString))
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
      {pastEvent ? null :
        <> 
          <Col sm={2} className="w-100 m-2 ms-0 p-3" variant="primary" style={{maxWidth:"400px", border: "1px solid #429DD0", padding: "10px", borderRadius: "15px", borderTopLeftRadius: "0px"}} >
            <h2 >{event.name.text}</h2>  
            <div>
              <p>Start: <strong>{dateInfo.startDate}</strong></p>
              <p>End: <strong>{dateInfo.endDate}</strong></p>
            </div>
            {imagesLoading ?
              <p>-- Image Loading --</p> : 
              <Image style={{height:"160px"}} src={images[event.category_id]?.thumb} alt={`generic ${event?.name?.text} event picture`}/>
            }
            <p >{`${event.description.text.slice(0, 80)}.........`}</p>
            <Card className= "mb-3">
              {eventTicketsError ? 
                <Alert variant="danger">{eventTicketsError}</Alert> :
                eventsTicketsLoading ? <p> --tickets loading --</p> :

                // same issue cant write to quantity_sold so with using quantity-total to track tickets cant reduce to zero on eventbrite Api.
                currentEventTicket?.quantity_total <= 1 ? <Alert variant="danger">TICKETS SOLD OUT!!</Alert> :
                <>
                  {currentEventTicket?.free ? <p style={{color:"green"}}>free event</p> : currentEventTicket?.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {currentEventTicket?.cost?.display}</p>}
                  <p style={{color:"green"}}>Tickets Available: {currentEventTicket?.quantity_total < 5 && currentEventTicket?.quantity_total > 0 ? 'Nearly Sold Out!!' : currentEventTicket?.quantity_total == 0 ? 'Sold Out!!!!!' : currentEventTicket?.quantity_total }</p> 
                </>
              }
            </Card>
            <Link to={`event/${event.id}`}><Button variant="primary">More Info</Button></Link>
          </Col>      
        </>
      }
    </>
  )
}
 