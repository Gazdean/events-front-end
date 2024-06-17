import React from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Col, Container, Row, Image } from "react-bootstrap";

export default function Landing({ images, categories, events, eventsTickets, setEventsTickets, imagesLoading }) {
 
  return (
    <Container className="mt-3">
      <Row>    
        <Col sm={6}><Image className="mt-4"   style={{maxWidth:"600px", border: "1px solid #429DD0", borderRadius: "15px", borderTopLeftRadius: "0px"}} src={images?.landing?.full} alt="cafe picture"/> {imagesLoading  && <p>-- Image Loading --</p>}  </Col>
        <Col sm={6} className="d-flex align-items-center" ><CallToAction /></Col>
      </Row>
      <Row>
        {events.length && <EventView images={images} imagesLoading= {imagesLoading} categories={categories} events={events} eventsTickets={eventsTickets} setEventsTickets={setEventsTickets}/>}
      </Row>
    </Container>
  );
}
