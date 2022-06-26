// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Require components:
import Navbar from "./NavBar";
import OrderForm from "./OrderForm";
import Sold from "./Meals/MealsSold";
import { Error } from "../pages/Error";
import MealForm from "./Meals/MealForm";
import LoginButton from "./LoginButton";
import Homepage from "../pages/HomePage";
import GlobalStyles from "./GlobalStyles";
import { MyMeals } from "./Meals/MyMeals";
import Profile from "../pages/ProfilePage";
import Meals from "../pages/MealsPage/Meals";
import Purchased from "./Meals/MealsPurchased";
import { Offered } from "./Meals/MyMealsOffered";
import EditUser from "../pages/ProfilePage/EditUser";
import DeleteMeal from "../pages/MealsPage/DeleteMeal";
import AuthWrapper from "./authentication/AuthWrapper";
import { SingleMeal } from "../pages/MealsPage/SingleMeal";

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
            <Route path="/purchased" element={<Purchased />} />
            <Route path="/sold" element={<Sold />} />
            <Route path="/offered" element={<Offered />} />
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
            <Route path="/user/:email" element={<EditUser />} />
            <Route path="login" element={<LoginButton />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AuthWrapper>
    </div>
  );
}

export default App;
