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
          <button className="btnAdd" onClick={this.openModal}>+</button>
          {cities.map((city) => (
            <li className="CityItem" key={city.id}>
              <Link to={`/city/${city.id}`}>
                {city.name}
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