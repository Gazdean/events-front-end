import React from 'react'
import { handleFormatDate } from '../utils'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Col, Row, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ProfileEventCard({event}) {
  const[dateObj, setDateObj] = useState({})

  useEffect(()=>{
    setDateObj(handleFormatDate(event))
  },[])
  
  return (
    <Card>
      <Row>
        <Row>{event.name.text}</Row>     
        <Col>Date: {dateObj.startDate}</Col>
        <Col>Time: {dateObj.startTime}</Col>
        <Col>
        <Button>Add to calender</Button>
        <Link to={`/event/${event.id}`}><Button>View Event</Button></Link>
        </Col>
      </Row>
    </Card>
  )
}
