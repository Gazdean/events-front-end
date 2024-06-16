import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { MyEventsProvider } from "./Contexts/MyEventsContext.jsx";
import { IsStaffProvider } from "./Contexts/IsStaffContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <MyEventsProvider>
      <IsStaffProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </IsStaffProvider>
    </MyEventsProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
