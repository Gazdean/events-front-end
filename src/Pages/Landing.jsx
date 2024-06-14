import React, { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Col, Container, Row, Image } from "react-bootstrap";

export default function Landing({ images, categories, events, eventsTickets, setEventsTickets, imagesLoading }) {
 
  return (
    <Container className="mt-3">
      <Row>
        
        <Col sm={6}><Image className="mt-4"width='100%' height='auto' src={images?.landing?.full} alt="cafe picture"/> {imagesLoading  && <p>-- Image Loading --</p>}  </Col>
        <Col sm={6}><CallToAction /></Col>
      </Row>
      <Row>
        {events.length && <EventView images={images} imagesLoading= {imagesLoading} categories={categories} events={events} eventsTickets={eventsTickets} setEventsTickets={setEventsTickets}/>}
      </Row>
    </Container>
  );
}
