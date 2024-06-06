import React, { useEffect, useState } from 'react'
import { fetchAllEvents } from '../apiEventBriteCalls'
import EventCard from './EventCard'
import { Container, Row } from 'react-bootstrap'

export default function EventView({organizationId, images}) {
  const [events, setEvents] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    if(organizationId) {
      handleFetchEvents()

    }
  }, [organizationId])

  async function handleFetchEvents() {
    setLoading(true)
    try {
      const eventsObject = await fetchAllEvents(organizationId)
      const events = eventsObject.events
      console.log(events, 'events')
      
      setEvents(events)
    }catch(error) {
      setError('Failed To fetch events')
    } finally {
      setLoading(false)
    }
  }


  return (
    <Container >
      <Row>
        {loading ? <p>--loading--</p> : events.map(event=><EventCard key={event.id} event={event} images={images}/>)}
      </Row>
    </Container >
  )
}
