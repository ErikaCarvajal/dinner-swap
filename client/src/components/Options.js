const Options = (props) => {
  const options = ["Add a new Meal", "Update", "Delete"];

  return (
    <>
      {options.map((option, index) => {
        return (
          <button key={`${index}Op`} onClick={() => props.onChecked(index)}>
            {option}
          </button>
        );
      })}
    </>
  );
};

export default Options;
