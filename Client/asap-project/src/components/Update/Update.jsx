import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://calf-kings.onrender.com/players/` + id)
            .then(res => {
                const playerData = res.data;
                console.log(res.data)
                setValue('name', playerData.name);
                setValue('age', playerData.age);
                setValue('calf_ratings', playerData.calf_ratings);
                setValue('height', playerData.height);
                setValue('img_url', playerData.img_url);
            })
            .catch(error => console.error(error));
    }, [id, setValue]);

    const onSubmit = async formData => {
        axios.put(`https://calf-kings.onrender.com/updateCard/` + id, formData)
            .then(() => {
                navigate("/"); 
                console.log(formData)
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="form-container">
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

                <label>Height:</label>
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
                    Update
                </button>
            </form>
        </div>
    );
}

export default Update;