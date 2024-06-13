import "./App.css";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";

import CreateEvent from "./Pages/CreateEvent";
import ForgotPassword from "./Pages/ForgotPassword";
import Join from "./Pages/Join";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import IndividualEvent from "./Pages/IndividualEvent";

import Header from "./Components/Header";
import UserPrivateRoute from "./Components/UserPrivateRoute";

import {
  fetchEventTickets,
  fetchEventbriteCategories,
  getEventbriteOrganizationId,
  fetchAllEvents,
} from "./apiEventBriteCalls";
import { fetchUnsplashCollection } from "./apiUnsplashCalls";
import { getCollection } from "./apiFirebaseCalls";

import { useAuth } from "./Contexts/AuthContext";
import { MyEventsContext } from "./Contexts/MyEventsContext";

function App() {
  const { setMyEvents, setMyEventsError, setMyEventsLoading } = useContext(MyEventsContext); /* for rendering events in users profile */

  const { currentUser } = useAuth();
  // States
  const [organizationId, setOrganizationId] = useState("");
  const [images, setImages] = useState({});
  const [categories, setCategories] = useState([]);
  const [eventsTickets, setEventsTickets] = useState([]);
  const [events, setEvents] = useState([]);
  // Error handling
  const [organizationIdError, setOrganizationIdError] = useState("");
  const [catError, setCatError] = useState("");
  const [imageError, setImageError] = useState("");
  // const [myEventsError, setMyEventsError] = useState("");
  const [eventsError, setEventsError] = useState("");
  const [eventTicketsError, setEventTicketsError] = useState("");
  // Loading 
  const [imagesLoading, setImagesLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  // const [myEventsLoading, setMyEventsLoading] = useState(false);
  const [eventsTicketsLoading, setEventsTicketsLoading] = useState(false);

  useEffect(() => {
    handleSetOrganisationId();
    handleFetchImages();
    handleSetCategories();
  }, []);

  useEffect(() => {
    if (currentUser) {
      handleFetchMyEvents("users", currentUser.email);
    } else {
      setMyEvents([]);
    }
  }, [currentUser]);

  useEffect(() => {
    organizationId && handleFetchEvents();
  }, [organizationId]);

  useEffect(() => {
    events && handleFetchEventsTickets();
  }, [events]);

  // EVENTBRITE CALL
  async function handleFetchMyEvents(collection, document) {
    setMyEventsError("");
    setMyEventsLoading(true)
    try {
      const myEventsResponse = await getCollection(collection, document);
        setMyEvents(myEventsResponse.myEvents);
      
    } catch (error) {
      console.log(error);
      setMyEventsError("Failed to load My Events");
    } finally {
      setMyEventsLoading(false)
    }
  }

  //UNSPLASH CALL
  async function handleFetchImages() {
    setImagesLoading(true);
    setImageError('')
    try {
      const responseImages = await fetchUnsplashCollection();
      const imageObject = {};
      responseImages.forEach((image) => {
        if (image.id === "tKN1WXrzQ3s") {
          imageObject.landing = image.urls;
        } else if (image.id === "aQYgUYwnCsM") {
          imageObject["102"] = image.urls;
        } else if (image.id === "EKpByvjvioU") {
          imageObject["103"] = image.urls;
        } else if (image.id === "2uwFEAGUm6E") {
          imageObject["104"] = image.urls;
        } else if (image.id === "yKc4YuGMPC4") {
          imageObject["105"] = image.urls;
        } else if (image.id === "FO4mQZi1c0M") {
          imageObject["106"] = image.urls;
        } else if (image.id === "2PODhmrvLik") {
          imageObject["107"] = image.urls;
        } else if (image.id === "mQVWb7kUoOE") {
          imageObject["108"] = image.urls;
        } else if (image.id === "snnhGYNqm44") {
          imageObject["110"] = image.urls;
        } else if (image.id === "7uSrOyY1U0I") {
          imageObject["111"] = image.urls;
        } else if (image.id === "Zyx1bK9mqmA") {
          imageObject["113"] = image.urls;
        } else if (image.id === "9QTQFihyles") {
          imageObject["115"] = image.urls;
        } else if (image.id === "gPnHi8AmO5k") {
          imageObject["199"] = image.urls;
        }
      });

      setImages(imageObject);
    } catch (error) {
      console.log(error);
      setImageError("Failed to load images");
    } finally {
      setImagesLoading(false);
    }
  }

  async function handleSetOrganisationId() {
    setOrganizationIdError("");
    try {
      const idResponse = await getEventbriteOrganizationId();
      setOrganizationId(idResponse);
    } catch {
      setOrganizationIdError("Failed To fetch organisation id");
    }
  }

  async function handleSetCategories() {
    setCatLoading(true);
    setCatError;
    try {
      const data = await fetchEventbriteCategories();
      const categories = data.categories;
      const filteredCategories = categories.filter((category) => {
        const wantedCategories = [
          103, 110, 113, 105, 104, 108, 107, 102, 111, 115, 106, 199,
        ];
        if (wantedCategories.includes(Number(category.id))) {
          return categories;
        }
      });
      setCategories(filteredCategories);
      setCatLoading(false);
    } catch(error) {
      console.log(error, " category error");
      setCatError("Failed To Load Categories");
    } finally {
      setCatLoading(false);
    }
  }

  async function handleFetchEvents() {
    setEventsLoading(true);
    setEventsError("");
    try {
      const eventsObject = await fetchAllEvents(organizationId);
      const responseEvents = eventsObject.events;
      setEvents(responseEvents);
    } catch (error) {
      setEventsError("Failed To fetch events");
    } finally {
      setEventsLoading(false);
    }
  }

  async function handleFetchEventsTickets() {
    const eventsIds = events.map((event) => event.id);
    const eventsTicketsObj = {};
    const errors = [];

    setEventsTicketsLoading(true);
    setEventTicketsError("");

    try {
        await Promise.all(
            eventsIds.map(async (eventId) => {
                try {
                    const tickets = await fetchEventTickets(eventId);
                    eventsTicketsObj[eventId] = tickets;
                } catch (error) {
                    console.log("ERROR: ", error);
                    errors.push(error)
                    throw error
                }
            })
        );
        setEventsTickets(eventsTicketsObj);
    } catch (error) {
        setEventTicketsError("Failed to fetch all event tickets");
    } finally {
          setEventsTicketsLoading(false);
    }
}

  return (
    <>
      <Header />
      {organizationIdError && <Alert variant="danger">{organizationIdError}</Alert>}
      {imageError && <Alert variant="danger">{imageError}</Alert>}
      <Container
        id="container"
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                organizationId={organizationId}
                images={images}
                imagesLoading={imagesLoading}
                catLoading={catLoading}
                categories={categories}
                events={events}
                eventsTickets={eventsTickets}
                eventsLoading={eventsLoading}
                eventsTicketsLoading={eventsTicketsLoading}
                catError = {catError}
                eventTicketsError={eventTicketsError}
                eventsError={eventsError}

              />
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/create-event"
            element={
              <UserPrivateRoute>
                <CreateEvent
                  organizationId={organizationId}
                  catLoading={catLoading}
                  categories={categories}
                />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserPrivateRoute>
                <Profile events={events} eventsError={eventsError} eventsLoading={eventsLoading} handleFetchMyEvents={handleFetchMyEvents}/>
              </UserPrivateRoute>
            }
          />
          <Route
            path="/event/:event_id"
            element={
              <IndividualEvent
                organizationId={organizationId}
                images={images}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
