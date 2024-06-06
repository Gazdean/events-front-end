import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ReturnToEventsButton() {
  return (
    <Link to={`/`}><Button className="me-5">Return to Events</Button></Link>
  )
}
