import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { fetchEventTicketClasses } from '../apiEventBriteCalls'
import { Link } from 'react-router-dom'
import { handleFormatDate } from '../utils'

export default function EventCard({event, images, filteredCat}) {

    const [ eventTickets, setEventTickets ] = useState({})
    const [ ticketCost, setTicketCost] = useState('')
    const [loading, setloading] = useState(false)
    const [dateInfo, setDateInfo] = useState({})
    const [error, setError] = useState('')

    useEffect(()=> {
        handleFetchTickets(event)
        setDateInfo(handleFormatDate(event))
        
    }, [])

    function handleFilterEvents(events) {
        console.log("in filter function", events)
        events.filter(event=> {
            if (filteredCat === "") event
            else {return event.category_id === filteredCat}
        })
      }

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
    
    <>
        {loading? <p>--loading--</p> :
            <Col sm={2} className="w-100 border m-2 ms-0 p-3" variant="primary" style={{maxWidth:"400px"}}>
                <h2 >{event.name.text}</h2>
                
                <div>
                    <p>Start: <strong>{dateInfo.startDate}</strong> at <strong>{dateInfo.startTime}</strong></p>
                    <p>End: <strong>{dateInfo.endDate}</strong> at <strong>{dateInfo.endTime}</strong></p>
                </div>
                <Image src={images[event.category_id].thumb} alt={"generic event"}/>
                <p >{`${event.description.text.slice(0, 100)}.........`}</p>

                <Card className= "mb-3">
                    {eventTickets.free ? <p style={{color:"green"}}>free event</p> : eventTickets.donation ? <p style={{color:"blue"}}>donation</p> : <p style={{color:"red"}}>Price: {ticketCost}</p>}
                    <p style={{color:"green"}}>Tickets Available: {eventTickets.quantity_total < 5 && eventTickets.quantity_total > 0 ? 'Nearly Sold Out!!' : eventTickets.quantity_total == 0 ? 'Sold Out!!!!!' : eventTickets.quantity_total }</p> 
                </Card>
                <Link to={`event/${event.id}`}><Button variant="primary">More Info</Button></Link>
            </Col>
    }
    </>
  )
}
