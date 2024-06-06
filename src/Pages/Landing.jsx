import React, { useEffect, useState } from "react";
import CallToAction from "../Components/CallToAction";
import EventView from "../Components/EventView";
import { Container } from "react-bootstrap";
import { fetchUnsplashCollection } from "../apiUnsplashCalls";

export default function Landing({ organizationId }) {
  const [images, setImages] = useState([])


  useEffect(()=>{
      handleFetchImages()
    },[]) 

  async function handleFetchImages() {
    try {
      const responseImages = await fetchUnsplashCollection()
      setImages(responseImages)
      console.log()

    } catch {

    } finally {

    }
  }

  return (
    <Container>
      <CallToAction />
      <EventView organizationId={organizationId} />
    </Container>
  );
}
