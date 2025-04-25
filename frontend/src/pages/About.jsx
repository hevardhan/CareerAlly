import { useState } from "react";
import axios from "axios";
const About = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://10.11.18.243:8000/api/addthe/${input}/`
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div>
      <h1>Input Something</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter something"
        />
        <button type="submit">Submit</button>
      </form>
      {result && <h2>{result}</h2>}
    </div>
  );
};

export default About;
