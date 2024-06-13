import React, { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Col, Container, Row, Image } from "react-bootstrap";

export default function Landing({ organizationId, images, catLoading, categories, events, eventsTickets, eventsLoading, imagesLoading, eventsTicketsLoading, catError, eventTicketsError, eventsError }) {
 
  return (
    <Container>
      <Row>
        {imagesLoading ? <p>-- Loading --</p> : <Col sm={6}><Image width='100%' height='auto' src={images["landing"]?.full} alt="cafe picture"/></Col>}
        <Col sm={6}><CallToAction /></Col>
      </Row>
      <EventView organizationId={organizationId} images={images} imagesLoading= {imagesLoading} catLoading={catLoading} categories={categories} events={events} eventsTickets={eventsTickets}  eventsLoading={eventsLoading} eventsTicketsLoading={eventsTicketsLoading} catError = {catError} eventTicketsError={eventTicketsError} eventsError={eventsError}/>
    </Container>
  );
}
