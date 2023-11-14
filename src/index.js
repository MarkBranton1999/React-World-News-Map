import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios"

import "./styles.css";

const API_KEY = process.env.REACT_APP_API_KEY

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
              onClick={() => {
                axios.get("https://newsapi.org/v2/top-headlines/sources?country=" + geo.id, {
                  headers: {
                    "X-Api-Key": API_KEY
                  }
                }).then((res) => console.log(res.data.sources))
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
