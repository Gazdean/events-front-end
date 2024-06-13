import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleFormatDate } from '../utils'

export default function EventCard({event, images, eventsTickets, imagesLoading}) {

    const [ticketCost, setTicketCost] = useState('')
    const [dateInfo, setDateInfo] = useState({})
    const [tickets, setTickets] = useState([])
    const [ticketQuantity, setTicketQuantity] = useState([])
   
    useEffect(() => {
        setDateInfo(handleFormatDate(event))   
      }, [event])

    useEffect(() => {
          const eventTicketObj = eventsTickets[event.id][0]
          setTickets(eventTicketObj)
      }, [eventsTickets])

    useEffect(()=>{
        setTicketQuantity(tickets.quantity_total)
        if(tickets.cost)
        setTicketCost(tickets.cost.display)
    },[tickets])

  return (
    <> 
        <Col sm={2} className="w-100 border m-2 ms-0 p-3" variant="primary" style={{maxWidth:"400px"}}>
            <h2 >{event.name.text}</h2>  
            <div>
                <p>Start: <strong>{dateInfo.startDate}</strong> at <strong>{dateInfo.startTime}</strong></p>
                <p>End: <strong>{dateInfo.endDate}</strong> at <strong>{dateInfo.endTime}</strong></p>
            </div>
            {imagesLoading ? <p>-- Loading --</p> : <Image src={images[event.category_id]?.thumb} alt={`generic ${event.name.text} event picture`}/> }
            <p >{`${event.description.text.slice(0, 100)}.........`}</p>

            <Card className= "mb-3">
                {tickets.free ? <p style={{color:"green"}}>free event</p> : tickets.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {ticketCost}</p>}
                <p style={{color:"green"}}>Tickets Available: {ticketQuantity < 5 && ticketQuantity > 0 ? 'Nearly Sold Out!!' : ticketQuantity == 0 ? 'Sold Out!!!!!' : ticketQuantity }</p> 
            </Card>
            <Link to={`event/${event.id}`}><Button variant="primary">More Info</Button></Link>
        </Col>      
    </>
  )
}
