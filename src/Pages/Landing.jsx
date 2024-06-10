import React, { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Col, Container, Row, Image } from "react-bootstrap";

export default function Landing({ organizationId, images, catLoading, categories, events, eventsTickets, eventsLoading, eventsTicketsLoading }) {
 
  return (
    <Container>
      <Row>
        {Object.keys(images).length? <Col sm={6}><Image width='100%' height='auto' src={images.landing.full} alt="cafe picture"/></Col> : null}
        <Col sm={6}><CallToAction /></Col>
      </Row>
      <EventView organizationId={organizationId} images={images} catLoading={catLoading} categories={categories} events={events} eventsTickets={eventsTickets}  eventsLoading={eventsLoading} eventsTicketsLoading={eventsTicketsLoading}/>
    </Container>
  );
}
