import React from 'react'
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

export default function CallToAction() {
  return (
    <Container className='d-flex justify-content-center mt-5'>
      <Card className='p-4 text-center'  style={{maxWidth:"600px", border: "2px solid #429DD0", padding: "10px", borderRadius: "15px" }}>
        <p className='h3'>Let's</p>
        <h1 className="display-4" style={{ color: "#429DD0" }}>Gather</h1>
        <p className='h5'>and make our community <strong>stronger</strong> together</p>
        <p>Browse our events, sign up, and connect with your local community</p>
        <p>All events held or meet at our Cafe unless stated</p>
      </Card>
    </Container>
  )
}