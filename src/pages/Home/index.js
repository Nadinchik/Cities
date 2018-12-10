import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./styles.scss";
import cities from "../../localeData";
//import Modal from "react-modal";
//import {ModalWindow}  from "../../components/Modal/index";

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
        <div className="CitiesMain">
          <div className="AddCity">
            <button className="btnAdd" onClick={this.openModal}>+</button><h3>ADD CITY</h3></div>
          {cities.map((city) => (
            <li className="CityItem" key={city.id}>
              <Link to={`/city/${city.id}`}>
               {city.name}
               {city.information}
               {city.coordinates}
              </Link>
              <div className="btnItem">
                <button className="editCity" onClick={this.openModal}>V</button>
                <button className="delCity">х</button>
              </div>
            </li>
          ))
          }
        </div>
      </div>
    );
  }
}

export default Home;