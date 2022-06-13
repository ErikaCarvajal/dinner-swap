// Require modules:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useAuth0 } from "@auth0/auth0-react";

// Require components:
import Homepage from "../pages/HomePage";
import Navbar from "./NavBar";
import Meals from "../pages/MealsPage/Meals";
import { NewMeal } from "../pages/MealsPage/NewMeal";
import DeleteMeal from "../pages/MealsPage/DeleteMeal";
import { SingleMeal } from "../pages/MealsPage/SingleMeal";
import AddUser from "../pages/ProfilePage/AddUser";
import Profile from "../pages/ProfilePage";
import CircularProgress from "@material-ui/core/CircularProgress";
import TestAddress from "../components/user/testAddress";

// import MealInput from "./MealInput";
import LoginButton from "./LoginButton";
import AuthWrapper from "./authentication/AuthWrapper";
import { Error } from "../pages/Error";
import PrivateRoute from "./authentication/PrivateRoute";
import OrderForm from "./OrderForm";

function App() {
  const { isLoading } = useAuth0();

  return (
    <div>
      {/* {!isLoading ? ( */}
      <AuthWrapper>
        <Router>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/meal/add" element={<NewMeal method={"add"} />} />
            <Route path="/meal/delete" element={<DeleteMeal method={"delete"} />} />
            <Route
              path="/meal/upd/:id"
              element={<NewMeal method={"update"} />}
            />
            <Route path="/meal/:id" element={<SingleMeal />} />

            <Route path="/order/:email" element={<OrderForm />} />
            
            <Route path="/user/:email" element={<AddUser />} />
            <Route path="login" element={<LoginButton />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AuthWrapper>
      {/* ) : (
        <>
        <h1>is loading</h1>
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
        </>
      )} */}
    </div>
  );
}

export default App;

const LoadingWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;
