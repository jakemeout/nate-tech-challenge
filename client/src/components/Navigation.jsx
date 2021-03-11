import React from "react";
import styled from "styled-components";

const Navigation = () => {
  return (
    <NavStyle>
      <h1>Parse-a-page</h1>
      <div data-testid="navigation">
        <h5>
          Submit a webpage for word processing! When you submit a url, we will
          process the document and share the results below.
        </h5>
      </div>
    </NavStyle>
  );
};

const NavStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  font-family: Helvetica;
`;

export default Navigation;
