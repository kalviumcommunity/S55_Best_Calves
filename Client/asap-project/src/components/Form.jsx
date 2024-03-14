import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import bgIMG from '../assets/CampNou.jpg'

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {

    const updatedFormData = {
      ...formData,
      created_by: sessionStorage.getItem('username') 
    };

    axios.post("https://calf-kings.onrender.com/add", updatedFormData)
      .then(() => {
        sessionStorage.setItem("registrationSuccess", "true");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <div className="bg">
        <img src={bgIMG} alt="" className="bgIMG"/>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="error">Name is required</p>}

        <label>Age:</label>
        <input
          type="number"
          {...register("age", { required: true })}
        />
        {errors.age && <p className="error">Age is required</p>}

        <label>Calf Ratings:</label>
        <input
          type="number"
          {...register("calf_ratings", { required: true, min: 1, max: 10 })}
        />
        {errors.calf_ratings && <p className="error">Calf Ratings must be between 1 and 10</p>}

        <label>Height(cms):</label>
        <input
          type="text"
          {...register("height", { required: true })}
        />
        {errors.height && <p className="error">Height is required</p>}

        <label>Image URL:</label>
        <input
          type="text"
          {...register("img_url", { required: true, pattern: /^https?:\/\/.+/ })}
        />
        {errors.img_url && <p className="error">Valid url starts with "http://" or "https://"</p>}

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
