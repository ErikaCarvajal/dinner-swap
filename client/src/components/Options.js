import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();

  const options = ["Add a new Meal", "Update", "Delete"];

  const handleClick = (e) => {
      console.log(e.target.value)
    navigate(`/meal/add`);
  };

  return (
    <>
      {options.map((option, index) => {
        return <button key={`${index}Op`} onClick={(e)=>handleClick(e)}>{option}</button>;
      })}
    </>
  );
};

export default Options;