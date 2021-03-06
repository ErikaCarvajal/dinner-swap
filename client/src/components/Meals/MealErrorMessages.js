export const handleErrorMessages = (mealToBeUpdated, oldMealData, setError) => {
  const errorMessages = {
    name: "Name cannot be empty",
    points: "Points cannot be empty or 0",
    description: "Description cannot be empty",
    contains: "Contains cannot be empty",
    daysAvailable: "Please include which days this meal is available",
    servings: "Servings cannot be 0",
  };

  const formKeysArray = Object.keys(mealToBeUpdated);

  formKeysArray.forEach((key) => {
    let strValue = mealToBeUpdated[key].toString();

    if (mealToBeUpdated.name.trim() === "") {
      setError(errorMessages[key]);
    } else if (mealToBeUpdated.points == 0) {
      setError(errorMessages.points);
    } else if (mealToBeUpdated.description.trim() === "") {
      setError(errorMessages.description);
    } else if (strValue.trim() === "") {
      setError(errorMessages[key]);
    }
  });
};
