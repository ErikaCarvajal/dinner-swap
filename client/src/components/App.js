// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Require components:
import Homepage from "../pages/HomePage";
import Meals from "../pages/MealsPage/Meals";
import Profile from "./Profile";
import MealInput from "./MealInput";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/mealinput" element={<MealInput />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
