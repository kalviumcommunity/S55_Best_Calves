import React from "react";
import './Home.css'

function Home() {
  return (
    <div className="main">
      <nav>
        <div>
          <input
            className="input"
            type="text"
            placeholder="🔍    Search Players"
          />
        </div>
      </nav>

      <div className="container flex">
          <div className="card">
            <div className="card-image">
              <img src="./react.svg"/>
            </div>
            <div className="card-text">
                <div className="details">
                    <div className="name">
                        <h3>Sergio Aguero</h3>
                        <h5 className="height">169 cms</h5>
                    </div>
                    <div className="age">
                        <h4>23 yrs</h4>
                    </div>
                </div>
                
                <br />

                <div>
                    <h3>Calf Ratings: 9</h3>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;

