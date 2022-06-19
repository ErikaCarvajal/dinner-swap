// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

// Require components:
import Homepage from "../pages/HomePage";
import Navbar from "./NavBar";
import Meals from "../pages/MealsPage/Meals";
import DeleteMeal from "../pages/MealsPage/DeleteMeal";
import { SingleMeal } from "../pages/MealsPage/SingleMeal";
import AddUser from "../pages/ProfilePage/AddUser";
import Profile from "../pages/ProfilePage";
import LoginButton from "./LoginButton";
import AuthWrapper from "./authentication/AuthWrapper";
import { Error } from "../pages/Error";
import OrderForm from "./OrderForm";
import MealForm from "./Meals/MealForm";
import { MyMeals } from "./Meals/MyMeals";
// import { useAuth0 } from "@auth0/auth0-react";
// const { isLoading } = useAuth0();

function App() {
  return (
    <div>
      <AuthWrapper>
        <Router>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/:id" element={<MyMeals />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/meal/add"
              element={<MealForm method={"Add"} oldMealData={null} />}
            />
            <Route
              path="/meal/delete"
              element={<DeleteMeal method={"delete"} />}
            />
            <Route
              path="/meal/upd/:id"
              element={<MealForm method={"update"} />}
            />
            <Route path="/meal/:id" element={<SingleMeal />} />

            <Route path="/order/:email" element={<OrderForm />} />

            <Route path="/user/:email" element={<AddUser />} />
            <Route path="login" element={<LoginButton />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AuthWrapper>
    </div>
  );
}

export default App;
