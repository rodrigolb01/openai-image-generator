import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
require("dotenv").config();

const App = () => {
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const request = async () => {
    if (description === "") {
      alert("invalid description");
      return;
    }

    try {
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });

      delete configuration.baseOptions.headers["User-Agent"];
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt: description,
        n: 1,
        size: "1024x1024",
      });

      setImg(response.data.data[0].url);
    } catch (error) {}
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Image Generator</h2>
      </header>
      <div>
        <h3>Image description</h3>
        <textarea
          cols={40}
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={request}>Submit</button>
      </div>
      <img style={{ maxHeight: "600px" }} src={img} alt={img}></img>
    </div>
  );
};

export default App;
