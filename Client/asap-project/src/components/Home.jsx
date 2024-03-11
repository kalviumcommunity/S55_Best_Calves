import React, { useEffect, useState } from "react";
import './Home.css';
import logo from '../assets/logo.png';
import axios from 'axios';
import { Link } from "react-router-dom";
import bgIMG from '../assets/CampNou.jpg'

function Home() {
  const [players, setPlayers] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://calf-kings.onrender.com/players');
        setPlayers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const showSuccess = sessionStorage.getItem("registrationSuccess");
    if (showSuccess) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        sessionStorage.removeItem("registrationSuccess");
      }, 3000);
    }
  }, []);

  return (
    <div>
      <div className="bg">
        <img src={bgIMG} alt="" className="bgIMG"/>
      </div>
      {showSuccessMessage && (
        <div className="success-message">
          Player Added ✅
        </div>
      )}
      <nav>
        <div>
          <img className="logo" src={logo} alt="" /> 
        </div>
        <div>
          <input
            className="input"
            type="text"
            placeholder="       Search Players"
          />
        </div>
        <div>
          <Link to="/insert">Insert Player</Link>
        </div>
        <div>
          <a href="https://github.com/SahilK1720">About</a>
        </div>
      </nav>

      <div className="container flex">
        {players.map(player => (
          <div className="card" key={player.name}>
            <div className="card-image">
              <img src={player.img_url} alt={player.img_url} />
            </div>
            <div className="card-text">
              <div className="details">
                <div className="name">
                  <h3>{player.name}</h3>
                  <h5 className="height">{player.height}</h5>
                </div>
                <div className="age">
                  <h4>{player.age} yrs</h4>
                </div>
              </div>
              <br />
              <div>
                <h3>Calf Rating: {player.calf_ratings}</h3>
              </div>
              <div className="actions">
                <div>
                  <Link to="/update">
                    <button className="update" >Update</button>
                  </Link>
                </div>
                <div>
                  <button className="delete">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
