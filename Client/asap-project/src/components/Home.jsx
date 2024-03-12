import React, { useEffect, useState } from "react";
import "./Home.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgIMG from "../assets/CampNou.jpg";

function Home() {
  const [players, setPlayers] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSignupSuccessMessage, setShowSignupSuccessMessage] = useState(false);
  const [showLoginSuccessMessage, setShowLoginSuccessMessage] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://calf-kings.onrender.com/players");
        setPlayers(response.data);
        console.log(response.data);
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

    const signupSuccess = sessionStorage.getItem('signupSuccess');
    if (signupSuccess) {
      setShowSignupSuccessMessage(true);
      setTimeout(() => {
        setShowSignupSuccessMessage(false);
        sessionStorage.removeItem('signupSuccess');
      }, 3000);
    }

    const loginSuccess = sessionStorage.getItem('loginSuccess');
    if (loginSuccess) {
      setShowLoginSuccessMessage(true);
      setTimeout(() => {
        setShowLoginSuccessMessage(false);
        sessionStorage.removeItem('loginSuccess');
      }, 3000);
    }


    const loginStatus = sessionStorage.getItem("login");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://calf-kings.onrender.com/delete/${id}`);
      const response = await axios.get("https://calf-kings.onrender.com/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    setIsLoggedIn(false);
    navigate("/"); 
  };

const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <div className="bg">
        <img src={bgIMG} alt="" className="bgIMG" />
      </div>
      {showSuccessMessage && <div className="success-message">Player Added ✅</div>}
      {showSignupSuccessMessage && <div className="success-message">Signup Successful ✅</div>}
      {showLoginSuccessMessage && <div className="success-message">Login Successful ✅</div>}
      <nav>
        <div className="firsthalf">
          <div>
            <img className="logo" src={logo} alt="" />
          </div>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Search Players"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="secondhalf">
          {isLoggedIn && (
            <div>
              <Link to="/insert"><button className="insertPlayer">Insert Player</button></Link>
            </div>
          )}
          {!isLoggedIn ? (
            <>
              <div>
                <Link to="/signup"><button className="insertPlayer">Sign Up</button></Link>
              </div>
              <div>
                <Link to="/login"><button className="logPlayer">Login</button></Link>
              </div>
            </>
          ) : (
            <div>
              <button className="logPlayer" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      <div className="container flex">
        {filteredPlayers.map((player) => (
          <div className="card" key={player.name}>
            <div className="card-image">
              <img src={player.img_url} alt={player.name} />
            </div>
            <div className="card-text">
              <div className="details">
                <div className="name">
                  <h3>{player.name}</h3>
                  <h5 className="height">{player.height} cm</h5>
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
                {isLoggedIn && (
                  <>
                    <div>
                      <Link to={`/update/${player._id}`}>
                        <button className="update">Update</button>
                      </Link>
                    </div>
                    <div>
                      <button
                        className="delete"
                        onClick={() => handleDelete(player._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
