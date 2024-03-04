import React from "react";
import './Home.css';
import logo from '../assets/logo.png'

function Home() {
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
          <div className="card">
            <div className="card-image">
              <img src="https://static.independent.co.uk/2021/08/09/12/2017481b2505454187ce12a4cc9c79a9Y29udGVudHNlYXJjaGFwaSwxNjI4NTkzMzk4-2.60020419.jpg?quality=75&width=1200&auto=webp"/>
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

