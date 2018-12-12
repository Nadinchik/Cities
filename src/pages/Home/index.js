import React, {Component} from "react";
import {Link} from "react-router-dom";
import _ from 'lodash';
import "./styles.scss";
import ModalWindow from "../../components/Modal";


const customStyles = {
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    overflow: "auto",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
};


class Home extends Component {
  constructor(props) {
    super(props);
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    this.state = {
      isSave: false,
      isOpen: false,
      cities,
      city: {
        text: "",
        information: "",
        coordinates: "",
      },
    };
  }

  guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4();
  };


  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  addCity = (e) => {
    e.preventDefault();
    const {city: {text, information, coordinates}, city, cities: source} = this.state;

    if ((text !== "") && (information !== "") && (coordinates !== "")) {
      const cities = _.cloneDeep(source);
      cities.push({...city, id: this.guid()});
      localStorage.setItem("cities", JSON.stringify(cities));

      this.setState(() => ({
        isOpen: false,
        cities,
        city: {
          text: "",
          information: "",
          coordinates: "",
        },
      }));
    }
  };

  editCity = (city) => {
    this.setState({ city, isOpen: true, isSave: true});
  };


  deleteCity = (id) => {
    const cities = [...this.state.cities];
    const updatedList = cities.filter(item => item.id !== id);
    this.setState({cities: updatedList});

    localStorage.setItem("cities", JSON.stringify(updatedList));
  };


  handleInput = (event) => {
    const {name, value} = event.target;
    this.setState(prevState => ({city: {...prevState.city, [name]: value}}));
  };


  render() {
    const {isOpen, cities, city} = this.state;
    return (
      <div className="App">
        <div className="CitiesMain">
          <button className="btnAdd" onClick={this.toggleModal}>+</button>
          <ul>
            {cities.length > 0 && cities.map((item) => (
              <li className="CityItem" key={item.id}>
                <Link to={{
                  pathname: `/city/${item.id}`,
                  state: item,
                }}>
                  <span>{item.text}</span>
                  <span>{item.information}</span>
                  <span>{item.coordinates}</span>
                </Link>
                <div className="btnItem">
                  <button className="editCity" onClick={() => this.editCity(item)}>V</button>
                  <button className="delCity" onClick={() => this.deleteCity(item.id)}>х</button>
                </div>
              </li>
            ))
            }
          </ul>
          <ModalWindow
            isOpen={isOpen}
            handleOpen={this.toggleModal}
            style={customStyles}
            type="add"
            city={city}
            handleInput={this.handleInput}
            addCity={this.addCity}
            editCity={this.editCity}
          />
        </div>
      </div>
    );
  }
}

export default Home;