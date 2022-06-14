// import { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import MealImage from "../../components/MealImage";
// import { UserContext } from "../../components/UserContext";
// import styled from "styled-components";
// import Wrapper from "../../components/Meals/MealWrapper";
// import { handleErrorMessages } from "../../components/Meals/MealErrorMessages";
// // import validate from "../../components/Meals/MealValidation";

// export const NewMeal = ({ method }) => {
//   const navigate = useNavigate();
//   const selectDays = useRef();
//   const { user } = useContext(UserContext);
//   const [formError, setFormError] = useState({});
//   const [error, setError] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const daysAvailableArray = [
//     "Saturdays and Sundays",
//     "Monday to Fridays",
//     "Everyday of the week",
//   ];

//   const [completeMeal, setCompleteMeal] = useState({
//     name: "",
//     points: 0,
//     description: "",
//     contains: "",
//     daysAvailable: "",
//     servings: 0,
//     daysInAdvance: 0,
//     userId: user._id,
//   });
//   const [previewSource, setPreviewSource] = useState("");

//   const handleChange = (e) => {
//     e.preventDefault();
//     // console.log(completeMeal.name);
//     const key = e.target.name;
//     const value = e.target.value;
//     setCompleteMeal({ ...completeMeal, [key]: value });
//     // setFormError(handleErrorMessages(key, value, setError))
//   };

//   const handleDaysAvailable = (e) => {
//     e.preventDefault();
//     setCompleteMeal({ ...completeMeal, daysAvailable: e.target.value });
//   };

//   // VALIDATION --- Leaving it out for now ========
//   // const handleBlur = (e) => {
//   //   e.preventDefault();
//   //   const key = e.target.name;
//   //   const value = e.target.value;
//   //   const fieldToCheck = {[key]: value}
//   //   console.log(key)
//   //   setFormError(`${key} can not be empty from BLUR 47`);
//   // }
//   // END OF VALIDATION ============================

//   // const handlePoints = (e) => {
//   //   setPoints(e.target.value);
//   // };
//   // console.log("USER ============ ", user._id)

//   // Look into Axios package
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // setFormError(handleErrorMessages(completeMeal, setError));// ======TO BE CHANGE
//     console.log();
//     console.log("CAN YOU SEE MEE, next is complete meal and previewSource");
//     console.log(completeMeal, previewSource);
//     if (previewSource) {
//       console.log("previewSource exists");
//     } else {
//       alert("Please include image");
//     }

//     // if (Object.keys(formError).length === 0) {
//     //   console.log("formError doesn't exits");
//     // } else {
//     //   console.log("formError exists from Submit", formError)
//     // }
//     // setFormError(validate(completeMeal));
//     // setIsSubmit(true);

//     // if (Object.keys(formError).length === 0 && isSubmit && Object.keys(previewSource).length !== 0) {
//     if (Object.keys(previewSource).length !== 0) {
//       console.log("true for  fetch");
//       fetch(`/api/meal/add`, {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           completeMeal,
//           data: previewSource,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           navigate("/meals");
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   // console.log(previewSource.length);
//   // useEffect(() => {
//   //   // console.log("Form ERROR", formError);
//   //   if (Object.keys(formError).length === 0 && isSubmit && previewSource) {
//   //     console.log(completeMeal) // do the fetch
//   //   }
//   // }, [formError]);

//   return (
//     <>
//       {/* {Object.keys(formError).length === 0 && isSubmit && previewSource} */}

//       <Wrapper>
//         <h1>New Meal</h1>
//         <Div>
//           {Object.keys(previewSource).length === 0 ? (
//             <>
//               <p>Meal image is required</p>
//               <MealImage
//                 previewSource={previewSource}
//                 setPreviewSource={setPreviewSource}
//               />
//             </>
//           ) : (
//             <>
//               <MealImage
//                 previewSource={previewSource}
//                 setPreviewSource={setPreviewSource}
//               />
//             </>
//           )}

//           <FormStyled onSubmit={handleSubmit}>
//             <label htmlFor="name">Recipe Name</label>
//             <input
//               type="text"
//               name="name"
//               onChange={handleChange}
//               value={completeMeal.name}
//               // onBlur={handleBlur}
//             />
//             {/* {(formError.name) > 
//             <ErrorMessageStyled>{formError.name}</ErrorMessageStyled> : null
//             } */}

//             <label htmlFor="points">Points</label>
//             <input
//               type="number"
//               name="points"
//               min={1}
//               defaultValue={0}
//               onChange={(e) => handleChange(e)}
//               require
//             />

//             <label htmlFor="description">Description</label>
//             <input
//               type="text"
//               name="description"
//               onChange={(e) => handleChange(e)}
//               // onBlur={handleBlur}
//               require
//             />
//             {/* <ErrorMessageStyled>{formError.description}</ErrorMessageStyled> */}

//             <label htmlFor="contains">Contains</label>
//             <input
//               type="text"
//               name="contains"
//               onChange={(e) => handleChange(e)}
//               // onBlur={handleBlur}
//               require
//             />
//             {/* <ErrorMessageStyled>{formError.contains}</ErrorMessageStyled> */}
//             {/* <fieldset> */}

//             <select
//               ref={selectDays}
//               onChange={(e) => handleDaysAvailable(e)}
//               name="daysAvailable"
//             >
//               <option value="">Which days is this meal available</option>
//               {daysAvailableArray.map((period, index) => {
//                 return (
//                   <option key={period} value={period}>
//                     {period}
//                   </option>
//                 );
//               })}
//             </select>

//             <label htmlFor="servings">Servings</label>
//             <input
//               type="number"
//               name="servings"
//               min={1}
//               onChange={(e) => handleChange(e)}
//               // onBlur={handleBlur}
//               require
//             />
//             {/* <ErrorMessageStyled>{formError.servins}</ErrorMessageStyled> */}

//             <div>
//               <label htmlFor="time-required">
//                 Days required in advance to order:
//               </label>
//               <input
//                 type="number"
//                 name="daysInAdvance"
//                 min={1}
//                 max="30"
//                 onChange={(e) => handleChange(e)}
//                 // onBlur={handleBlur}
//                 require
//               />
//             </div>
//             {/* <ErrorMessageStyled>{formError.timeRequired}</ErrorMessageStyled> */}

//             <button type="submit">{method}</button>
//           </FormStyled>
//         </Div>
//       </Wrapper>
//     </>
//   );
// };

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const FormStyled = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const ErrorMessageStyled = styled.p`
//   border: 2px solid red;
//   color: "red";
// `;
