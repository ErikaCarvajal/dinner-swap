// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Require components:
import Homepage from "./Homepage";
import Meals from "./Meals";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/all" element={<Meals />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
