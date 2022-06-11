export const handleErrorMessages = (mealToBeUpdated, oldMealData, setError) => {
  const errorMessages = {
    name: "Name cannot be empty",
    points: "Points cannot be empty or 0",
    description: "Description cannot be empty",
    contains: "Contains cannot be empty",
    daysAvailable: "Please include which days this meal is available",
    servings: "Servings cannot be 0",
    daysInAdvance: "Time Required cannot be empty",
  };

  const formKeysArray = Object.keys(mealToBeUpdated);

  
  formKeysArray.forEach((key) => {
      let strValue = mealToBeUpdated[key].toString();
      console.log(mealToBeUpdated.name)
      if (mealToBeUpdated.name.trim() === "") {
        console.log("Inside empty name")
      setError(errorMessages[key])
    } else  if (mealToBeUpdated.points == 0) {
      setError(errorMessages.points);
    } else if (mealToBeUpdated.description.trim() === '') {
      setError(errorMessages.description)
    } else if (mealToBeUpdated.daysInAdvanced == 0) {
      setError(errorMessages.daysInAdvance)
    // } else if (mealToBeUpdated.daysInAdvance == 0) {
    //   setError(errorMessages.daysInAdvance)
    // } else if (mealToBeUpdated.daysInAdvance == 0) {
    //   setError(errorMessages.daysInAdvance)
    // } else if (mealToBeUpdated.servings == 0) {
    //   setError(errorMessages.servings);
    } else if (strValue.trim() === "") {
      setError(errorMessages[key]);
    }
  });
};
