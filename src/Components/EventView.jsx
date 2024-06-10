import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row } from 'react-bootstrap'
import FilterButton from './FilterButton'

export default function EventView({organizationId, images, catLoading, categories, events, eventsTickets, eventsLoading, eventsTicketsLoading}) {

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [filteredCat, setFilteredCat] = useState("")
  const [filteredEvents, setFilteredEvents] = useState([])

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
 
  return (
    <>
        <Container className="mt-5">
          <h1>{filteredEvents.length === events.length ? "All Events" : filteredCat ? categories.find(category=>category.id === filteredCat).name : null}</h1>
          <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-1" aria-label="First group">
          <FilterButton classname="pe-1" catLoading={catLoading} categories={categories} setFilteredCat={setFilteredCat}/>
          <Button className="ms-1" onClick={()=>setFilteredCat()}>Cancel Filter</Button>
          </ButtonGroup>
        </ButtonToolbar>
          
          <Row className="mt-5">
            {eventsLoading ? <p>--Events Loading--</p> : eventsTicketsLoading ? <p>-- Tickets Loading --</p> : filteredEvents.map(event=><EventCard key={event.id} event={event} images={images} eventsTickets={eventsTickets} eventsTicketsLoading={eventsTicketsLoading}/>)}
          </Row>
          {events.length && !filteredEvents.length ? <Row><h2>Sorry<br/> There Are No Events Of This Type!</h2></Row> : null}
          {error && <Alert variant="danger">{error}</Alert>}
        </Container >
      
    </>
    
  )
}