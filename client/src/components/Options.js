import styled from "styled-components";

const Options = (props) => {
  const options = ["Add a new Meal", "Update", "Delete"];

  return (
    <Wrapper>
      {options.map((option, index) => {
        return (
          <button key={`${index}Op`} onClick={() => props.onChecked(index)}>
            {option}
          </button>
        );
      })}
    </Wrapper>
  );
};

export default Options;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 12px 15px;
  align-content: center;
`;
