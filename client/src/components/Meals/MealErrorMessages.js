export const handleErrorMessages = (mealToBeUpdated, setError) => {
  const errorMessages = {
    name: "Name cannot be empty",
    points: "Points cannot be empty or 0",
    description: "Description cannot be empty",
    contains: "Contains cannot be empty",
    daysAvailable: "Please include which days this meal is available",
    servings: "Servings cannot be 0",
    timeRequired: "Time Required cannot be empty",
  };

  const formKeysArray = Object.keys(mealToBeUpdated);

  formKeysArray.forEach((key) => {
    let strValue = mealToBeUpdated[key].toString();
    if (mealToBeUpdated.points == 0) {
      setError(errorMessages.points);
    } else if (mealToBeUpdated.timeRequired == 0) {
      setError(errorMessages.timeRequired)
    } else if (mealToBeUpdated.servings == 0) {
      setError(errorMessages.servings);
    } else if (strValue.trim() === "") {
      setError(errorMessages[key]);
    }
  });
};
