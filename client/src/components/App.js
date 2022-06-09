// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

// Require components:
import Homepage from "../pages/HomePage";
import Navbar from "./NavBar";
import Meals from "../pages/MealsPage/Meals";
import { NewMeal } from "../pages/MealsPage/NewMeal";
import SingleMeal from "../pages/MealsPage/SingleMeal";
import Profile from "../pages/ProfilePage";
// import MealInput from "./MealInput";
import LoginButton from "./LoginButton";

function App() {
  return (
    <div>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meal/add" element={<NewMeal method={"add"} />} />
          <Route path="/meal/del" element={<NewMeal method={"delete"} />} />
          <Route path="/meal/upd/:id" element={<NewMeal method={"update"} />} />
          <Route path="/meal/:id" element={<SingleMeal />} />
          {/* <Route path="/mealinput" element={<MealImage />} /> */}
          <Route path="login" element={<LoginButton />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
