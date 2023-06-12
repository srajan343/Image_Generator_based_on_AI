import React, { useState } from "react";

const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (<div className="container al-c mt-3">
    <h1>Hii Welcome to <span>Image Generator App</span></h1>
    <p>Please enter the name of the object for the image you want..</p>
    <form className="gen-form" onSubmit={handleSubmit}>
      <input type="text" name="input" placeholder="Enter name." />
      <button type="submit">Generate</button>
    </form>
    <div>
    {loading && <div className="loading">Loading...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  />
      </div>
    )}
    </div>

    </div>);
  
};

export default ImageGenerationForm;