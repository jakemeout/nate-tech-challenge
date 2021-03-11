import React, { useState } from "react";
import styled from "styled-components";

const History = () => {
  const [value, setValue] = useState(" ");
  const onUpdate = (text) => setValue(text);
  const SearchBar = () => {
    return (
      <div>
        Search Results by URL:
        <input
          type="text"
          name="filter"
          value={value}
          placeholder={"https://google.com"}
          onChange={(e) => onUpdate(e.target.value)}
        />
      </div>
    );
  };

  return (
    <HistoryStyle>
      <SearchBar />
    </HistoryStyle>
  );
};

const HistoryStyle = styled.div`
  display: flex;
  justify-content: center;
  font-family: Helvetica;
  margin-top: 10%;
`;

export default History;
