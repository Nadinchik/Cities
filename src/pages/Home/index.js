import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import cities from "../../localeData";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCity: 0,
    };
  }

  render() {
    return (
      <div className="App">
        {
          cities.map((city) => (
            <li key={city.id}>
              <Link to={`/city/${city.id}`}>
                {city.name}
              </Link>
            </li>
          ))
        }
        {/* <Cities
          key={activeCity}
          zip={CITIES[activeCity].id}
        />*/}
      </div>
    );
  }
}

export default Home;