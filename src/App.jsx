import './App.css'

import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateEvent from './Pages/CreateEvent'
import EventView from './Pages/EventView'
import ForgotPassword from './Pages/ForgotPassword'
import IndivdualCategory from './Pages/IndivdualCategory'
import Join from './Pages/Join'
import Landing from './Pages/Landing'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Header from './Components/Header';
import { Container } from 'react-bootstrap';
import UserPrivateRoute from './Components/UserPrivateRoute';

function App() {

  return (
    <> 
      <Header />
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"80vh"}}>  
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/category" element={<IndivdualCategory />} />
              <Route path="/event-view" element={<EventView />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/join" element={<Join />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-event" element={<UserPrivateRoute><CreateEvent /></UserPrivateRoute>} />
              <Route path="/profile" element={<UserPrivateRoute><Profile /></UserPrivateRoute>} />
            </Routes>
      </Container>
    </>
  )
}

export default App
