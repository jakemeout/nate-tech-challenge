import React, { useEffect, useState, useMemo, useCallback } from "react";

const SearchResults = ({value, onUpdate}) => {
//   const [value, setValue] = useState("");

  return (
    <div>
      Search Results by URL:
      <input
        type="text"
        value={value}
        placeholder={"https://google.com"}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </div>
  );
};

export default SearchResults;