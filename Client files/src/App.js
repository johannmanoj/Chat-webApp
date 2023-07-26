import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/UserAuthContext";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
