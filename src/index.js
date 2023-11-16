import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios"
import Modal from 'react-modal'
import ArticleList from "./components/ArticleList";
import AppContext from "./AppContext";
import "./styles.css";

const API_KEY = process.env.REACT_APP_API_KEY

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const rootElement = document.getElementById("root");
Modal.setAppElement(rootElement);

function App(){
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
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
                }).then((res) => {
                  console.log(res.data.sources)
                })
                openModal();
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
      >
        <ArticleList></ArticleList>
      </Modal>
  </div>
  );
  }
ReactDOM.render(<App />, rootElement);
