import axios from "axios";

const eventbriteToken = import.meta.env.VITE_EVENTBRITE_PERSONAL_OAUTH_TOKEN;
const baseUrl = "https://www.eventbriteapi.com/v3/";
const headers = {
  Authorization: `Bearer ${eventbriteToken}`,
  "Content-Type": "application/json",
};

async function fetchEventbriteCategories() {
  console.log("called categories");

  const url = `${baseUrl}categories/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

async function createEventbriteEvent(eventData, organizationId) {
  console.log("called create event");
  console.log("event data", eventData);

  const url = `${baseUrl}organizations/${organizationId}/events/`;

  try {
    const response = await axios.post(url, eventData, { headers: headers });
    return response.data;
  } catch (error) {
    console.error("Error while creating event:", error);
    throw error;
  }
}

async function createEventTicketClass(ticketData, event_id) {
  console.log("called ticket classes");

  const url = `${baseUrl}events/${event_id}/ticket_classes/`;

  try {
    const response = await axios.post(url, ticketData, { headers: headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchAllEvents(organizationId) {
  console.log("called All Events");

  const url = `${baseUrl}organizations/${organizationId}/events/`;
  const params = { expand: "ticket_availability" };
  try {
    const response = await axios.get(url, { headers: headers, params: params });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response ? error.response.data : error.message
    );
  }
}

async function fetchIndividualEvent(eventId) {
  console.log("called individual event");

  const url = `${baseUrl}/events/${eventId}/`;

  try {
    const response = await axios.get(url, { headers: headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching event:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function fetchEventTickets(eventId) {
  console.log("called ticket classes");

  const url = `${baseUrl}events/${eventId}/ticket_classes/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data.ticket_classes;
  } catch (error) {
    console.error("Error fetching ticket classes:", error);
    throw error;
  }
}

async function getEventbriteOrganizationId() {
  console.log("called organization");

  const url = `${baseUrl}users/me/organizations/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data.organizations[0].id;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export {
  fetchEventbriteCategories,
  createEventbriteEvent,
  getEventbriteOrganizationId,
  createEventTicketClass,
  fetchAllEvents,
  fetchEventTickets,
  fetchIndividualEvent,
};
