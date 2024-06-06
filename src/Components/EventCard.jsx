import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import { fetchEventTicketClasses } from '../apiEventBriteCalls'
import { Link } from 'react-router-dom'
import { handleFormatDate } from '../utils'

export default function EventCard({event}) {

    const [ eventTickets, setEventTickets ] = useState({})
    const [ ticketCost, setTicketCost] = useState('')
    const [loading, setloading] = useState(false)
    const [dateInfo, setDateInfo] = useState({})
    const [error, setError] = useState("")

    useEffect(()=> {
        handleFetchTickets(event)
        setDateInfo(handleFormatDate(event))
    }, [])

    async function handleFetchTickets(event) {
        const eventId = event.id
        setloading(true)
        try {
            const tickets = await fetchEventTicketClasses(eventId)
            setEventTickets(tickets[0])
            if (tickets[0].cost) setTicketCost(tickets[0].cost.display)
        } catch (error){
            console.log('ERORR: ', error)
            setError('failed to fetch event tickets')
        } finally {
            setloading(false)
        }
    }

  return (

    <Col sm={2} className="w-100 border m-2 ms-0 p-3" variant="primary" style={{maxWidth:"400px"}}>
        <h2 >{event.name.text}</h2>
        
        <div>
            <p>Date: {dateInfo.startDate}</p>
            <p>Time: {dateInfo.startTime} to {dateInfo.endTime}</p>
        </div>
        <p >{`${event.description.text.slice(0, 100)}.........`}</p>

        <Card className= "mb-3">
            {loading? <p>--loading--</p> : eventTickets.free ? <p style={{color:"green"}}>free event</p> : eventTickets.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {ticketCost}</p>}
            {loading? <p>--loading--</p> : <p style={{color:"green"}}>Tickets Available: {eventTickets.quantity_total < 5 && eventTickets.quantity_total > 0 ? 'Nearly Sold Out!!' : eventTickets.quantity_total == 0 ? 'Sold Out!!!!!' : eventTickets.quantity_total }</p> }
        </Card>
        <Link to={`event/${event.id}`}><Button variant="primary">View More</Button></Link>
    </Col>
  )
}
