import React, { useState } from "react";
import { POST_REQUEST_OPTION } from "../constants";

const Form = ({ endpoint, label, options = {} }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const field = endpoint === "conversations" ? "title" : "text";
    const date = endpoint === "conversations" ? "start_date" : "date_sent";

    const formBody = {
      [field]: input,
      [date]: new Date().toISOString(),
      ...options,
    };
    fetch(`http://localhost:5000/${endpoint}`, {
      ...POST_REQUEST_OPTION,
      body: JSON.stringify(formBody),
    })
      .then((response) => response.json)
      .then((data) => console.log("===", data));
  };

  return (
    <form>
      <label data-testid="form-label">{label}</label>
      <input
        data-testid="form-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        data-testid="form-submit"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
