import React, { useEffect, useState } from 'react'
import ReturnToEventsButton from '../Components/ReturnToEventsButton'
import { Alert, Container, Row } from 'react-bootstrap'

import ProfileEventCard from '../Components/ProfileEventCard'
import { useContext } from 'react'
import { MyEventsContext } from '../Contexts/MyEventsContext'

import { useAuth } from "../Contexts/AuthContext"

export default function Profile({events, handleFetchMyEvents}) {
  const { currentUser } = useAuth();
  const { myEvents, myEventsLoading, myEventsError } = useContext(MyEventsContext);
  const [filteredEvents,  setFilteredEvents] = useState([])

  useEffect(() => {
      handleFetchMyEvents("users", currentUser.email);
  }, []);

  useEffect(()=>{
    if (events.length && myEvents.length) {
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
          <Row className="mt-5" >
            {!myEvents.length ? <p>You Have No Events</p> : filteredEvents.map(event=><ProfileEventCard key={event.id} event={event}/>)}     
          </Row>
        }   
        <ReturnToEventsButton className="pt-4" string={"Return To Events"}/>
      </Container>
    </>
  )
}
