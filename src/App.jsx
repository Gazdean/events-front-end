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
import { Container } from "react-bootstrap";
import UserPrivateRoute from "./Components/UserPrivateRoute";
import "./App.css";

import { getEventbriteOrganizationId } from "./apiEventBriteCalls";
import { useEffect, useState } from "react";

function App() {
  const [organizationId, setOrganizationId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleSetOrganisationId();
  }, []);

  async function handleSetOrganisationId() {
    setError("");
    try {
      const idResponse = await getEventbriteOrganizationId();
      setOrganizationId(idResponse);
    } catch {
      setError("Failed To fetch organisation id");
    }
  }

  return (
    <>
      <Header />
      <Container
        id="container"
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <Routes>
          <Route
            path="/"
            element={<Landing organizationId={organizationId} />}
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/create-event"
            element={
              <UserPrivateRoute>
                <CreateEvent organizationId={organizationId} />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserPrivateRoute>
                <Profile />
              </UserPrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
