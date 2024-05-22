import './App.css'
import CreateEventPage from './Pages/CreateEvent'
import EventView from './Pages/EventView'
import ForgotPasswordPage from './Pages/ForgotPassword'
import IndivdualCategory from './Pages/IndivdualCategory'
import JoinPage from './Pages/Join'
import LandingPage from './Pages/Landing'
import ProfilePage from './Pages/Profile'
import SignInPage from './Pages/SignIn'

function App() {

  return (
    <>
      <LandingPage></LandingPage>
      <IndivdualCategory></IndivdualCategory>
      <EventView></EventView>
      <SignInPage></SignInPage>
      <JoinPage></JoinPage>
      <ForgotPasswordPage></ForgotPasswordPage>
      <CreateEventPage></CreateEventPage>
      <ProfilePage></ProfilePage>
    </>
  )
}

export default App
