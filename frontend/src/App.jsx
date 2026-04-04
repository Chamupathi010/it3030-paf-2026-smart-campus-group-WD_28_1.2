import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import LoginSuccess from "./pages/LoginSuccess"; //TODO: Change to Dashboard after implementing it

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login-success" element={<LoginSuccess />} />//TODO: Change to /dashboard after implementing it
      </Routes>
    </Router>
  );
}

export default App;