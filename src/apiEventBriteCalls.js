import axios from "axios";

const eventbriteToken = import.meta.env.VITE_EVENTBRITE_PERSONAL_OAUTH_TOKEN;
// const organizationId = import.meta.env.VITE_EVENTBRITE_ORGANIZATION_ID;

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

async function createEventbriteEvent(eventData, organizationId) {

  const url = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`
  const headers = {
      'Authorization': `Bearer ${eventbriteToken}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.post(url, eventData, { headers: headers });
      console.log(response.data)
      return response.data;
  } catch (error) {
      console.error('Error while creating event:', error);
      throw error;
  }
}

async function createEventTicketClass(ticketData, event_id) {

  const url = `https://www.eventbriteapi.com/v3/events/${event_id}/ticket_classes/`
  const headers = {
      'Authorization': `Bearer ${eventbriteToken}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.post(url, ticketData, { headers: headers });
      console.log(response.data)
      return response.data;
  } catch (error) {
      if (error.response) {
      // Request made and server responded
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Body:', error.response.data.error_description);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    throw error;
  }
}

async function fetchAllEvents(organizationId) {

  const url = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`;
 
  const headers = {
    Authorization: `Bearer ${eventbriteToken}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.get(url, { headers: headers });
    console.log('Events fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.response ? error.response.data : error.message);
  }
}

async function getEventbriteOrganizationId() {
  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/users/me/organizations/', {
      headers: {
        'Authorization': `Bearer ${eventbriteToken}`
      }
    });
    return response.data.organizations[0].id;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export { fetchEventbriteCategories, createEventbriteEvent, getEventbriteOrganizationId, createEventTicketClass, fetchAllEvents }