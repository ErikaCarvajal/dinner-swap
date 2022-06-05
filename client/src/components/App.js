// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Require components:
import Homepage from "../pages/HomePage";
import Meals from "../pages/MealsPage/Meals";
import { NewMeal } from "../pages/MealsPage/NewMeal";
import SingleMeal from "../pages/MealsPage/SingleMeal";
import Profile from "./Profile";
import MealInput from "./MealInput";
import LoginButton from "./LoginButton";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* {need to make them protected routes} */}
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/new" element={<NewMeal />} />
            <Route path="/mealinput" element={<MealInput />} />
            <Route path="/meals/:id" element={<SingleMeal />} />
          </>
          <Route path="login" element={<LoginButton />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
