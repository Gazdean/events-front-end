import React, { useEffect, useState } from 'react'
import { fetchAllEvents } from '../apiEventBriteCalls'
import EventCard from './EventCard'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row } from 'react-bootstrap'
import FilterButton from './FilterButton'

export default function EventView({organizationId, images, catLoading, categories}) {

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
    <Container className="mt-5">
      <h1>All Events</h1>
      <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-1" aria-label="First group">
      <FilterButton classname="pe-1" catLoading={catLoading} categories={categories} />
      <Button className="ms-1">Cancel Filter</Button>
      </ButtonGroup>
    </ButtonToolbar>
      
      <Row className="mt-5">
        {loading ? <p>--loading--</p> : events.map(event=><EventCard key={event.id} event={event} images={images}/>)}
      </Row>
    </Container >
  )
}