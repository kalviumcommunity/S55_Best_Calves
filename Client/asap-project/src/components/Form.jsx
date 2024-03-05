import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    calf_ratings: "",
    height: "",
    img_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axios.post("https://calf-kings.onrender.com/add", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label>Calf Ratings:</label>
        <input
          type="number"
          name="calf_ratings"
          value={formData.calf_ratings}
          onChange={handleChange}
        />
        <label>Height:</label>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
