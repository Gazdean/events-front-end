import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import { postCalendarEventGoogleApi } from '../apiGoogleCalls';
import { Alert } from 'react-bootstrap';

export default function ModalCalendarBody({event, showSignUpModal}) {
  const [calendarEventError, setCalendarEventError] = useState('');
  const [creatingCalendarEvent, setCreatingCalendarEvent] = useState(false);
  const navigate = useNavigate()

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';


  const handleAddEventToCalendar = () => {
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
          navigate('/profile')
        }
      }
    });

    tokenClient.requestAccessToken();
  };

  function handleClose() {
        navigate('/profile')
}

    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title>Add Event To Your Calendar</Modal.Title>
        </Modal.Header>
      <Modal.Body> 
        Do you want to add this event to your calendar?
      </Modal.Body>
      {calendarEventError && <Alert variant="danger">{calendarEventError}</Alert>}
      <Button variant="primary" disable={creatingCalendarEvent? 'true' : 'false'} onClick={handleAddEventToCalendar}>Add To Calendar</Button>
      <Modal.Footer>
        <Button disable={creatingCalendarEvent ? 'true' : 'false'} variant="secondary" onClick={handleClose}>Close</Button>         
      </Modal.Footer>
      </>
    )
}
