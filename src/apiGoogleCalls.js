import axios from 'axios';

async function postCalendarEventGoogleApi(eventData, accessToken) {
    try {
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      eventData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    window.open(response.data.htmlLink);
    
  } catch (error) {
    console.log('Error creating event', error);
    throw error
  }
 }

export {postCalendarEventGoogleApi}
