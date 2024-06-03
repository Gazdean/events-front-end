import axios from "axios";

const eventbriteToken = import.meta.env.VITE_EVENTBRITE_PERSONAL_OAUTH_TOKEN;
const organizationId = import.meta.env.VITE_EVENTBRITE_ORGANIZER_ID;

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

  const url = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`
  const headers = {
      'Authorization': `Bearer ${eventbriteToken}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.post(url, {
          event: {
              ...eventData.event
          }
        }, 
        { headers: headers });
      return response.data;
  } catch (error) {
      console.error('Error while creating event:', error.response.data);
      throw new Error('Failed to create event');
  }
}

async function fetchOrganizationEvents() {

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

fetchOrganizationEvents()

async function getEventbriteUserId() {
  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/users/me/organizations/', {
      headers: {
        'Authorization': `Bearer ${eventbriteToken}`
      }
    });
    console.log('organisation_id: ',response.data.organizations[0].id)
    return response.data.id;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

getEventbriteUserId()


export { fetchEventbriteCategories, createEventbriteEvent }