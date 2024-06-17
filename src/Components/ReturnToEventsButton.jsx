import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ReturnToEventsButton({string}) {
  return (
    <Link to={`/`}><Button variant='secondary' className="mt-2">{string}</Button></Link>
  )
}
