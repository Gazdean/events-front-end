import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import { fetchEventTicketClasses } from '../apiEventBriteCalls'

export default function EventCard({event}) {

    const [ eventTickets, setEventTickets ] = useState({})
    const [ ticketCost, setTicketCost] = useState('')
    const [loading, setloading] = useState(false)
    const [dateInfo, setDateInfo] = useState({})
    const [timeInfo, setTimeInfo] = useState({})
    const [error, SetError] = useState("")
    console.log(event)

    useEffect(()=> {
        handleFetchTickets()
    }, [])

    async function handleFetchTickets() {
        const eventId = event.id
        setloading(true)
        try {
            const tickets = await fetchEventTicketClasses(eventId)
            console.log('tickets', tickets[0].quantity_total )
            setEventTickets(tickets[0])
            if (tickets[0].cost) setTicketCost(tickets[0].cost.display)
            handleFormatDate()

        } catch (error){
            console.log('ERORR: ', error)
            SetError('failed to fetch event tickets')

        } finally {
            setloading(false)
        }
    }

    function handleFormatDate() {
        const startString =  event.start.local
        const endString = event.end.local

        const startDate = `${startString.slice(8,10)}-${startString.slice(5,7)}-${startString.slice(0, 4)}`
        const endDate = `${endString.slice(8,10)}-${endString.slice(5,7)}-${endString.slice(0, 4)}`
        setDateInfo({start: startDate, end: endDate})

        const startTime = startString.slice(11, 16)
        const endTime = endString.slice(11, 16)
        setTimeInfo({start: startTime, end: endTime})
    }

  return (

    <Col sm={2} className="w-100 border m-2 ms-0 p-3" variant="primary" style={{maxWidth:"400px"}}>
        <h2 >{event.name.text}</h2>
        
        <div>
            <p>Date: {dateInfo.start}</p>
            <p>Time: {timeInfo.start} to {timeInfo.end}</p>
        </div>
        <p >{event.description.text}</p>

        <Card className= "mb-3">
            {loading? <p>--loading--</p> : eventTickets.free ? <p style={{color:"green"}}>free event</p> : eventTickets.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {ticketCost}</p>}
            {loading? <p>--loading--</p> : <p style={{color:"green"}}>Tickets Available: {eventTickets.quantity_total > 5 ? eventTickets.quantity_total : 'Nearly Sold Out!!'}</p> }
        </Card>
        <Button href="#" variant="primary">Sign up to event</Button>   
    </Col>
  )
}
