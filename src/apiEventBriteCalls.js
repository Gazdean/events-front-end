import axios from "axios";

const eventbriteToken = import.meta.env.VITE_EVENTBRITE_TOKEN;
const organizerId = import.meta.env.VITE_EVENTBRITE_ORGANIZER_ID;

async function fetchEventbriteCategories() {
  const url = 'https://www.eventbriteapi.com/v3/categories/';
  const headers = {
    'Authorization': `Bearer ${eventbriteToken}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

async function createEventbriteEvent(eventData) {

  const url = 'https://www.eventbriteapi.com/v3/events/';
  const headers = {
      'Authorization': `Bearer ${eventbriteToken}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.post(url, {
          event: {
              organizer_id: organizerId,
              ...eventData.event
          }
      }, {
          headers: headers
      });
      return response.data;
  } catch (error) {
      console.error('Error while creating event:', error.response.data);
      throw new Error('Failed to create event');
  }
}

export { fetchEventbriteCategories, createEventbriteEvent }