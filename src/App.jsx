import "./App.css";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Container} from "react-bootstrap";
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
  getEventbriteOrganizationId,
  fetchEventbriteCategories,
  fetchAllEvents,
} from "./apiEventBriteCalls";

import { fetchUnsplashCollection } from "./apiUnsplashCalls";
import { getCollection } from "./apiFirebaseCalls";

import { useAuth } from "./Contexts/AuthContext";
import { MyEventsContext } from "./Contexts/MyEventsContext";
import LoadingComponent from "./Components/LoadingComponent";
import HeaderTest from "./Components/Header";

function App() {
  const { setMyEvents, setMyEventsError, setMyEventsLoading } = useContext(MyEventsContext); /* for rendering events in users profile */

  const { currentUser } = useAuth();

  // Data States
  const [organizationId, setOrganizationId] = useState("");
  const [images, setImages] = useState({});
  const [categories, setCategories] = useState([]);
  const [eventsTickets, setEventsTickets] = useState({});
  const [events, setEvents] = useState([]);

  // Error Handling States
  const [organizationIdError, setOrganizationIdError] = useState("");
  const [catError, setCatError] = useState("");
  const [imageError, setImageError] = useState("");
  const [eventsError, setEventsError] = useState("");
  // const [myEventsError, setMyEventsError] = useState(""); // moved to context

  // Loading States
  const [fetchingOrganisatioId, setFetchingOrganisationId] = useState(false)
  const [imagesLoading, setImagesLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  // const [myEventsLoading, setMyEventsLoading] = useState(false); // moved to context

  useEffect(() => {
    handleSetOrganisationId();
    handleSetCategories();
    handleFetchImages();
  }, []);

  async function handleSetOrganisationId() {
    setFetchingOrganisationId(true);
    setOrganizationIdError("");

    try {
      const idResponse = await getEventbriteOrganizationId();
      setOrganizationId(idResponse);
    } catch(error) {
      console.log("organisation Id error", error)
      setOrganizationIdError("Site down, Failed To fetch organisation id ");
    } finally {
      setFetchingOrganisationId(false)
    }
  } 

    async function handleSetCategories() {
    setCatLoading(true);
    setCatError("");

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

  async function handleFetchImages() {
    setImagesLoading(true);
    setImageError('');

    try {
      const responseImages = await fetchUnsplashCollection();
      const imageObject = {};
      responseImages.forEach((image) => {
        if (image.id === "tKN1WXrzQ3s") {
          // Cafe Picture
          imageObject.landing = image.urls;
        } else if (image.id === "aQYgUYwnCsM") {
          // Science & tech
          imageObject["102"] = image.urls;
        } else if (image.id === "EKpByvjvioU") {
          // Music
          imageObject["103"] = image.urls;
        } else if (image.id === "2uwFEAGUm6E") {
          // Film & Media
          imageObject["104"] = image.urls;
        } else if (image.id === "yKc4YuGMPC4") {
          // Arts
          imageObject["105"] = image.urls;
        } else if (image.id === "IwVRO3TLjLc") {
          // Fashion
          imageObject["106"] = image.urls;
        } else if (image.id === "2PODhmrvLik") {
          // Health
          imageObject["107"] = image.urls;
        } else if (image.id === "mQVWb7kUoOE") {
          // Sports & Fitness
          imageObject["108"] = image.urls;
        } else if (image.id === "snnhGYNqm44") {
          // Food & Drink
          imageObject["110"] = image.urls;
        } else if (image.id === "7uSrOyY1U0I") {
          // Charity & Causes
          imageObject["111"] = image.urls;
        } else if (image.id === "Zyx1bK9mqmA") {
          // Community
          imageObject["113"] = image.urls;
        } else if (image.id === "9QTQFihyles") {
          // Family & Education
          imageObject["115"] = image.urls;
        } else if (image.id === "gPnHi8AmO5k") {
          // Other
          imageObject["199"] = image.urls;
        }
      });

      setImages(imageObject);
    } catch (error) {
      console.log('failed to load images', error);
      setImageError("Failed to load images");
    } finally {
      setImagesLoading(false);
    }
  }

  useEffect(() => {
    organizationId && handleFetchEvents();
  }, [organizationId]);

  async function handleFetchEvents() {
    setEventsLoading(true);
    setEventsError("");

    try {
      const eventsObject = await fetchAllEvents(organizationId);
      const responseEvents = eventsObject.events;
      
      setEvents(responseEvents);
    } catch (error) {
      setEventsError("Failed To fetch events", error);
    } finally {
      setEventsLoading(false);
    }
  }
  
  useEffect(() => {
    if (currentUser) {
      handleFetchMyEvents("users", currentUser.email);
    } else {
      setMyEvents([]);
    }
  }, [currentUser]);

  async function handleFetchMyEvents(collection, document) {
    setMyEventsError("");
    setMyEventsLoading(true)
    try {
      const myEventsResponse = await getCollection(collection, document);
        setMyEvents(myEventsResponse.myEvents);    
    } catch (error) {
      console.log('failed to load my events', error);
      setMyEventsError("Failed to load My Events");
    } finally {
      setMyEventsLoading(false)
    }
  }

  return (
    <>
      {organizationIdError && <Alert variant="danger">{organizationIdError}</Alert>}
      {eventsError && <Alert variant="danger">{eventsError}</Alert>}
      {catError && <Alert variant="danger">{catError}</Alert>}

      {eventsLoading || catLoading && 
        <LoadingComponent loadingMessage={"LOADING GATHER EVENTS"}/>}
      {organizationId && events.length && categories.length &&
      <>
        <HeaderTest/>
        {imageError && <Alert variant="danger">{imageError}</Alert>}
          <Container id="container" className="mt-5 d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Landing
                    organizationId={organizationId}
                    categories={categories}
                    events={events}
                    images={images}
                    imagesLoading={imagesLoading}
                    eventsTickets={eventsTickets}
                    setEventsTickets={setEventsTickets}
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
                      categories={categories}
                    />
                  </UserPrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <UserPrivateRoute>
                    <Profile events={events} handleFetchMyEvents={handleFetchMyEvents}/>
                  </UserPrivateRoute>
                }
              />
              <Route
                path="/event/:event_id"
                element={
                  <IndividualEvent
                    organizationId={organizationId}
                    images={images}
                    imagesLoading={imagesLoading}
                  />
                }
              />
            </Routes>
          </Container>
        </>
      }
    </>
  );
}

export default App;
