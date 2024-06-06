import React, { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Col, Container, Row, Image } from "react-bootstrap";

export default function Landing({ organizationId, images}) {

  return (
    <Container>
      <Row>
        {Object.keys(images).length? <Col sm={6}><Image width='100%' height='auto' src={images.landing.full} alt="cafe picture"/></Col> : null}
        <Col sm={6}><CallToAction /></Col>
      </Row>
      <EventView organizationId={organizationId} images={images}/>
    </Container>
  );
}
