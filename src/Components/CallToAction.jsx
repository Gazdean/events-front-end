import React from 'react'
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

export default function CallToAction() {
  return (
    <Container className='d-flex justify-content-center my-4'>
      <Card className='p-4 text-center' style={{ maxWidth: '600px' }}>
        <p className='h3'>Let's</p>
        <h1 className="display-4" style={{ color: "#429DD0" }}>Gather</h1>
        <p className='h5'>and make our community <strong>stronger</strong> together</p>
        <p>Browse local events, sign up, and connect with your neighborhood.</p>
      </Card>
    </Container>
  )
}