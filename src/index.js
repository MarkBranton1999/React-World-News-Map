import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import "./styles.css";

const App = () => (
  <div>
    <ComposableMap>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: "#123456"
                },
                hover: {
                  fill: "#F53"
                }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
