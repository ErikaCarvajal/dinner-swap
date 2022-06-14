// import { useAuth0 } from "@auth0/auth0-react";
// import { useContext, useState } from "react";
// import { UserContext } from "../../components/UserContext";
// import Wrapper from "../../components/Meals/MealWrapper";
// import UserAddress from "../../components/user/Address";
// import IsLogged from "./IsLogged";
// import { useNavigate } from "react-router-dom";

// const AddUser = () => {
//   const navigate = useNavigate();
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const { user: userDB } = useContext(UserContext);

//   const [address, setAddress] = useState({
//     streetNumber: "",
//     streetName: "",
//     city: "",
//     postCode: "",
//     province: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefaul();
//     if (user) {
//       fetch(`api/user/${userDB.email}`, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           ...userDB,
//           address: {
//             user,
//             streetAddress,
//             postCode,
//             city,
//             province,
//           },
//         }),
//       })
//         .then((res) => res.json)
//         .then((data) => {
//           console.log(data);
//           // {window.sessionStorage.setItem("email", JSON.stringify(user.email))}
//           //   navigate('/')
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   return (
//     <>
//       <Wrapper>
//         {streetAddress === "" && (
//           <>
//             <h2>Thank you for subs Dinner Swap.</h2>
//             <h3>
//               To finalize the process, please include the address where the
//               meals can be picked up:
//             </h3>
//           </>
//         )}
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <label htmlFor="userName"></label>
//           <input type="text" name="userName"/>
//           <label htmlFor="address"></label>
//           <UserAddress address={address} setAddress={setAddress} />
//           {console.log(province, user)}
//           <input type="submit" value="Submit" />
//         </form>
//       </Wrapper>
//     </>
//   );
// };

// export default AddUser;
