// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Require components:
import Homepage from "../pages/HomePage";
import Meals from "./Meals";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/all" element={<Meals />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
