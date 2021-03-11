import React, { useState } from "react";
import { POST_REQUEST_OPTION } from "../constants";
import styled from "styled-components";

const SubmitUrl = () => {
  const [value, setValue] = useState("https://");
  const [results, setResults] = useState(null);
  const onType = (text) => setValue(text);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formBody = {
      url: value,
    };
    fetch(`http://localhost:5000/api/parse`, {
      ...POST_REQUEST_OPTION,
      body: JSON.stringify(formBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      });
  };

  const Results = () => {
    const { analysis, url, text } = results;
    const renderData = () => {
      const data = [];
      Object.keys(analysis || {}).forEach((key) => {
        data.push(
          <div>
            {key}: {analysis[key]}
          </div>
        );
      });
      return data;
    };

    return (
      <ResultsStyle>
        <h1>Results</h1>
        <h3>You searched {url}</h3>
        <h6>{text}</h6>
        <ResultAnalysis>{renderData()}</ResultAnalysis>
      </ResultsStyle>
    );
  };

  return (
    <>
      <SubmitUrlStyle>
        <div>
          Enter a URL:
          <form>
            <input
              type="text"
              name="input"
              value={value}
              placeholder={"https://google.com"}
              onChange={(e) => onType(e.target.value)}
            />
            <button type="submit" value="Submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
        {results ? <Results /> : null}
      </SubmitUrlStyle>
    </>
  );
};

const SubmitUrlStyle = styled.div`
  display: flex;
  justify-content: center;
  font-family: Helvetica;
  margin-top: 5%;
`;

const ResultsStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica;
  align-items: center;
  margin-top: 10%;
`;
const ResultAnalysis = styled.div`
  border: 1px solid grey;
  height: 500px;
  width: 600px;
  overflow: scroll;
  flex-direction: column;
  display: flex;
  padding: 10px;
  align-items: center;
`;

export default SubmitUrl;
