import React, { useEffect, useState } from "react";
import './Home.css';
import logo from '../assets/logo.png';
import axios from 'axios';

function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://calf-kings.onrender.com/players');
        setPlayers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main">
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
          <a href="">About</a>
        </div>
      </nav>

      <div className="container flex">
        {players.map(player => (
          <div className="card" key={player.name}>
            <div className="card-image">
              <img src={player.img_url} alt={player.name} />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
