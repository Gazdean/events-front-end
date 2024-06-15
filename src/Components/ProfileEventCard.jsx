import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleFormatDate } from '../utils';

export default function ProfileEventCard({ event }) {
  const [dateObj, setDateObj] = useState({});

  useEffect(() => {
    setDateObj(handleFormatDate(event));
  }, [event]);

  return (
    <Card>
      <Row>
        <Row>{event.name.text}</Row>     
        <Col>Date: {dateObj.startDate}</Col>
        <Col>Time: {dateObj.startTime}</Col>
        <Col>
          <Link to={`/event/${event.id}`}><Button>View Event</Button></Link>
        </Col>
      </Row>
    </Card>
  );
}

