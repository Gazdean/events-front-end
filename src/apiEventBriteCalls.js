import axios from "axios";

const eventbriteToken = import.meta.env.VITE_EVENTBRITE_PERSONAL_OAUTH_TOKEN;
const baseUrl = 'https://www.eventbriteapi.com/v3/'
const headers = {
    'Authorization': `Bearer ${eventbriteToken}`,
    'Content-Type': 'application/json'
  };

async function fetchEventbriteCategories() {
  const url = `${baseUrl}categories/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

async function createEventbriteEvent(eventData, organizationId) {
  console.log('event data',eventData)

  const url = `${baseUrl}organizations/${organizationId}/events/`

  try {
      const response = await axios.post(url, eventData, { headers: headers });
      return response.data;
  } catch (error) {
      console.error('Error while creating event:', error);
      throw error;
  }
}

async function createEventTicketClass(ticketData, event_id) {

  const url = `${baseUrl}events/${event_id}/ticket_classes/`

  try {
    const response = await axios.post(url, ticketData, { headers: headers });
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
}}

async function fetchAllEvents(organizationId) {

  const url = `${baseUrl}organizations/${organizationId}/events/`;

  try {
    const response = await axios.get(url, { headers: headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.response ? error.response.data : error.message);
  }
}

async function fetchIndividualEvent(eventId) {

  const url = `${baseUrl}/events/${eventId}/`;

  try {
    const response = await axios.get(url, { headers: headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error.response ? error.response.data : error.message);
    throw error
  }
}

async function fetchEventTicketClasses(eventId) {
  const url = `${baseUrl}events/${eventId}/ticket_classes/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data.ticket_classes;
  } catch (error) {
    console.error('Error fetching ticket classes:', error);
    throw error;
  }
}


async function getEventbriteOrganizationId() {
  const url = `${baseUrl}users/me/organizations/`;

  try {
    const response = await axios.get(url, {headers});
    return response.data.organizations[0].id;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export { 
  fetchEventbriteCategories, 
  createEventbriteEvent, 
  getEventbriteOrganizationId, 
  createEventTicketClass, 
  fetchAllEvents, 
  fetchEventTicketClasses,
  fetchIndividualEvent
}