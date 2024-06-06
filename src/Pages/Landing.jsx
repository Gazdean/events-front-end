import React, { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Container } from "react-bootstrap";

export default function Landing({ organizationId }) {

  return (
    <Container>
      <CallToAction />
      <EventView organizationId={organizationId} />
    </Container>
  );
}
