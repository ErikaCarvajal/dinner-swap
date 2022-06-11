//TO BE NAME MEAL ERROR MESSAGES IF IT WORKS

const validate = (props) => {
    // const {previewSource} =props;

      const errorMessage = {};
      if (props.name.trim() === "") {
        errorMessage.name = "Recipe name is required"
      } else if (props.name.length < 5) {
          errorMessage.name = "Recipe name needs to be more than 5 characters"
      }
      
      if (props.description.trim() === "") {
        errorMessage.description = "Description is required"
      } else if (props.description.length < 10) {
          errorMessage.description = "Description needs to be more than 10 characters long"
      }

      if (props.servings == 0) {
        errorMessage.servings = "Include servings quantity"
      }
      

      // if (props.contains.trim() === "") {
      //   errorMessage.contains = "Contains is required"
      // } else if (props.contains.length < 5) {
      //     errorMessage.contains = "contains needs to be more than 5 characters long"
      // }



      return errorMessage;
    }

    export default validate;