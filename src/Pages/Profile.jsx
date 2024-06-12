import React, { useEffect, useState } from 'react'
import ReturnToEventsButton from '../Components/ReturnToEventsButton'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import EventCard from '../Components/EventCard'
import ProfileEventCard from '../Components/ProfileEventCard'
import { useContext } from 'react'
import { MyEventsContext } from '../Contexts/MyEventsContext'

export default function Profile({events, eventsError, eventsLoading}) {
  
  const [filteredEvents,  setFilteredEvents] = useState([])
  const { myEvents, myEventsLoading, myEventsError } = useContext(MyEventsContext);

  useEffect(()=>{
    if (events.length && myEvents.length) {
    console.log('profile events', events)
    handleFilterEvents()
    }
  },[events, myEvents])

  function handleFilterEvents() {
    const myFilteredEvents = events.filter(event => myEvents.includes(event.id))
    setFilteredEvents(myFilteredEvents)
  }

  return (
    <>
        <Container>
          <h2>My Events</h2>
          {myEventsError && <Alert variant="danger">{myEventsError}</Alert>}
          {myEventsLoading ? <p>-- Loading My Events --</p> : 
          <Row>
            <Row className="mt-5">
            
            {eventsLoading ? <p>-- Events Loading --</p> : !myEvents.length ? <p>You Have No Events</p> : filteredEvents.map(event=><ProfileEventCard key={event.id} event={event}/>)}     
          </Row>
            {eventsError && <Alert variant="danger">{eventsError}</Alert>}
          </Row>
          
          }   
          <ReturnToEventsButton string={"Return To Events"}/>
        </Container>
    </>
  )
}
