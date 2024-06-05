import React from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Container } from "react-bootstrap";

export default function Landing({ organizationId }) {
  console.log(organizationId);

  return (
    <Container>
      <CallToAction />
      <EventView organizationId={organizationId} />
    </Container>
  );
}
