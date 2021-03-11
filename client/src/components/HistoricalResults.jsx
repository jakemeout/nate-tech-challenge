import React, { useEffect, useState, useMemo, useCallback } from "react";
import { GET_REQUEST_OPTION } from "../constants";
import styled from "styled-components";
import SearchResults from "./SearchResults"
const HistoricalResults = () => {
  
  const [historicalData, setHistory] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/historicalsearch`, {
      ...GET_REQUEST_OPTION,
    })
      .then((response) => response.json())
      .then((data) => {
        setHistory(data.historicalsearch);
      });
  }, []);

  console.log(historicalData);

  const searchFilter = useMemo(() => {
    if (!filter.length) return historicalData;
    return historicalData?.filter((item) =>
      (item.url || "").toLowerCase().includes((filter || "").toLowerCase())
    );
  }, [filter, historicalData]);

  const renderHistory = () => {
    const data = [];
    (searchFilter || [])?.forEach((item) => {
      data.push(
        <ResultStyle>
          <h2>{item.url}</h2>
          <h6>Searched on {item.created_at}</h6>
          <h6>{item.big_text}</h6>
        </ResultStyle>
      );
      Object.keys(item.text_analysis || {}).forEach((key) => {
        data.push(
          <div>
            {key}: {item.text_analysis[key]}
          </div>
        );
      });
    });
    return data;
  };

  

  return (
    <HistoryStyle>
      <h2>History Of Search Analytics By URL</h2>
      <SearchResults value={filter} onUpdate={setFilter} />
      <ResultAnalysis>{renderHistory()}</ResultAnalysis>
    </HistoryStyle>
  );
};

const HistoryStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;
  margin-top: 5%;
`;

const ResultAnalysis = styled.div`
  margin-top: 5%;
  border: 1px solid grey;
  height: 800px;
  width: 800px;
  overflow: scroll;
  flex-direction: column;
  display: flex;
  padding: 10px;
  align-items: center;
`;
const ResultStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default HistoricalResults;
