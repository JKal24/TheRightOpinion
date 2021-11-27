import * as React from "react";
import { useAppSelector } from "../app/hooks";

const Search = () => {

  const stats = useAppSelector((state) => state.stats.viewCount);

  return (
    <div className="Search">
      <div>Searching for a video...</div>
      Loading icon...
      {stats}
    </div>
  );
};

export default Search;
