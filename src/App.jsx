import "./App.css";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateEvent from "./Pages/CreateEvent";
import ForgotPassword from "./Pages/ForgotPassword";
import Join from "./Pages/Join";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import Header from "./Components/Header";
import { Alert, Container } from "react-bootstrap";
import UserPrivateRoute from "./Components/UserPrivateRoute";
import "./App.css";

import { fetchEventbriteCategories, getEventbriteOrganizationId } from "./apiEventBriteCalls";
import { useEffect, useState } from "react";
import IndividualEvent from "./Pages/IndividualEvent";
import {fetchUnsplashCollection} from './apiUnsplashCalls'

function App() {
  const [organizationId, setOrganizationId] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState({})
  const [loadingImages, setLoadingImages] = useState(false)

    const [catLoading, setCatLoading] = useState(false)
    const [categories, setCategories] = useState([])
  
  useEffect(() => {
    handleSetOrganisationId();
    handleFetchImages()
    handleSetCategories()
  }, []);

  async function handleFetchImages() {
    setLoadingImages(true)
    try {
      const responseImages = await fetchUnsplashCollection()
      // console.log('response images', responseImages)
      const imageObject = {}
      responseImages.forEach(image=> {
        if (image.id === 'EKpByvjvioU') {imageObject['103']=image.urls}
        else if (image.id === 'snnhGYNqm44') {imageObject['110']=image.urls}
        else if (image.id === 'Zyx1bK9mqmA') {imageObject['113']=image.urls}
        else if (image.id === '2PODhmrvLik') {imageObject['107']=image.urls}
        else if (image.id === 'yKc4YuGMPC4') {imageObject['105']=image.urls}
        else if (image.id === '2uwFEAGUm6E') {imageObject['104']=image.urls}
        else if (image.id === 'gPnHi8AmO5k') {imageObject['199']=image.urls}
        else if (image.id === 'aQYgUYwnCsM') {imageObject['102']=image.urls}
        else if (image.id === 'tKN1WXrzQ3s') {imageObject.landing=image.urls}
        else if (image.id === '7uSrOyY1U0I') {imageObject['113']=image.urls}
        else if (image.id === '9QTQFihyles') {imageObject['115']=image.urls}
        else if (image.id === 'FO4mQZi1c0M') {imageObject['106']=image.urls}
        else if (image.id === 'mQVWb7kUoOE') {imageObject['108']=image.urls}
      })

      setImages(imageObject)
    } catch(error) {
        console.log(error)
        setError(error)
    } finally {
      setLoadingImages(false)
    }
  }
  
  async function handleSetOrganisationId() {
    setError("");
    try {
      const idResponse = await getEventbriteOrganizationId();
      setOrganizationId(idResponse);
    } catch {
      setError("Failed To fetch organisation id");
    }
  }

  async function handleSetCategories() {
    setCatLoading(true)
    try { 
        const data = await fetchEventbriteCategories()
        const categories = data.categories
        const filteredCategories = categories.filter(category=>{
            const wantedCategories = [103,110,113,105,104,108,107,102,111,115,106,199]
            if (wantedCategories.includes(Number(category.id))) {
                return categories
            }
        })
        setCategories(filteredCategories)
        setCatLoading(false)
    } catch {
        console.log(error, ' category error')
        setError('Failed To Load Categories')
    } finally {
        setCatLoading(false)
    }
  }

  return (
    <>
      <Header />
      {error && <Alert variant="danger">{error}</Alert>}
      <Container
        id="container"
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <Routes>
          <Route
            path="/"
            element={<Landing organizationId={organizationId} images={images} loadingImages={loadingImages} catLoading={catLoading} categories={categories} />}
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-event" element={<UserPrivateRoute><CreateEvent organizationId={organizationId} catLoading={catLoading} categories={categories} /></UserPrivateRoute>}/>
          <Route path="/profile" element={<UserPrivateRoute> <Profile /> </UserPrivateRoute>}/>
          <Route path="/event/:event_id" element={<IndividualEvent organizationId={organizationId} images={images}/>}/>
        </Routes>
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    </>
  );
}

export default App;