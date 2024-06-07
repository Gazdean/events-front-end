import React, { useEffect, useState } from 'react'
import { fetchAllEvents } from '../apiEventBriteCalls'
import EventCard from './EventCard'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row } from 'react-bootstrap'
import FilterButton from './FilterButton'

export default function EventView({organizationId, images, catLoading, categories}) {

  const [events, setEvents] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [filteredCat, setFilteredCat] = useState("")
  const [filteredEvents, setFilteredEvents] = useState([])


  
  useEffect(()=>{
    if(organizationId) {
      handleFetchEvents()
    }
  }, [organizationId])

  useEffect(()=>{
   handleFilterEvents(events)
  }, [events, filteredCat])

  function handleFilterEvents(events) {
    if (!filteredCat) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category_id === filteredCat));
    }
  }

  async function handleFetchEvents() {
    setLoading(true)
    try {
      const eventsObject = await fetchAllEvents(organizationId)
      const events = eventsObject.events      
      setEvents(events)
      console.log("herererere", events)
    }catch(error) {
      setError('Failed To fetch events')
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <Container className="mt-5">
      <h1>{filteredEvents.length === events.length ? "All Events" : filteredCat ? categories.find(category=>category.id === filteredCat).name : null}</h1>
      <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-1" aria-label="First group">
      <FilterButton classname="pe-1" catLoading={catLoading} categories={categories} setFilteredCat={setFilteredCat}/>
      <Button className="ms-1" onClick={()=>setFilteredCat()}>Cancel Filter</Button>
      </ButtonGroup>
    </ButtonToolbar>
      
      <Row className="mt-5">
        {loading ? <p>--loading--</p> : filteredEvents.map(event=><EventCard key={event.id} event={event} images={images} filteredCat={filteredCat}/>)}
      </Row>
      {events.length && !filteredEvents.length ? <Row><h2>Sorry<br/> There Are No Events Of This Type!</h2></Row> : null}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container >
  )
}