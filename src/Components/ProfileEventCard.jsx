import React from 'react'
import { handleFormatDate } from '../utils'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'

export default function ProfileEventCard({event, images}) {
  const[dateObj, setDateObj] = useState({})

  useEffect(()=>{
    setDateObj(handleFormatDate(event))
  },[])
  
  return (
    <Card>
      <Row><Col>{event.name.text}</Col>
      {/* <Image src={images[event.category_id].thumb} alt={"generic event"}/> */}
        
        <Col>Date: {dateObj.startDate}</Col>
        <Col>Time: {dateObj.startTime}</Col>
      </Row>
    </Card>
  )
}
