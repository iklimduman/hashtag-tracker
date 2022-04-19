
import WorldMap from "./Components/WorldMap";
import ReactTooltip from "react-tooltip";
import React, { useEffect, useState } from "react";

const App = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <WorldMap setTooltipContent={setContent}/>
      <ReactTooltip>{content}</ReactTooltip>
    </div>

  )
};

export default App;