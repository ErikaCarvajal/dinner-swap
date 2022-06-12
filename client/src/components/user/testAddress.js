import { useState } from "react";

export const TestAddress = () => {
  const [inputAdd, setInputAdd] = useState("");

  return (
    <>
      <input
        type="text"
        id="address"
        value={inputAdd}
        onChange={(e) => {
          setInputAdd(e.target.value);
        }}
      />
    </>
  );
};

export default TestAddress;
