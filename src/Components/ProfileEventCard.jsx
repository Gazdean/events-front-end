import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleFormatDate } from '../utils';
import { postCalendarEventGoogleApi } from '../apiGoogleCalls';

export default function ProfileEventCard({ event }) {
  const [dateObj, setDateObj] = useState({});
  const [calendarEventError, setCalendarEventError] = useState('');
  const [creatingCalendarEvent, setCreatingCalendarEvent] = useState(false);

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  useEffect(() => {
    setDateObj(handleFormatDate(event));
  }, [event]);

  const handleCalendarOnClick = () => {
        setCalendarEventError('')
        setCreatingCalendarEvent('true')
        const eventData = {
          summary: event.name.text,
          location: '',
          description: event.description.text,
          start: {
            dateTime: event.start.local,
            timeZone: event.start.timezone,
          },
          end: {
            dateTime: event.end.local,
            timeZone: event.end.timezone,
          },
        }; 
        
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: async (response) => {
            if (response.error) {
              console.error('Error obtaining access token', response);
              return;
            }

        const accessToken = response.access_token;

        try {
          postCalendarEventGoogleApi(eventData, accessToken)
        } catch (error) {
          console.error('Error creating event', error);
          setCalendarEventError('Error creating event')
        } finally {
          setCreatingCalendarEvent(false)
        }
      }
    });

    tokenClient.requestAccessToken();
  };

  return (
    <Card>
      <Row>
        <Row>{event.name.text}</Row>     
        <Col>Date: {dateObj.startDate}</Col>
        <Col>Time: {dateObj.startTime}</Col>
        <Col>
          <Button onClick={handleCalendarOnClick}>Add to calendar</Button>
          {calendarEventError && <Alert variant="danger">{calendarEventError}</Alert>}
          <Link to={`/event/${event.id}`}><Button>View Event</Button></Link>
        </Col>
      </Row>
    </Card>
  );
}

