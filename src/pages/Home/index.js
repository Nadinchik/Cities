import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./styles.scss";
// import City from "../City";
import ModalWindow from "../../components/Modal";
// import FormCities from "../../components/FormCities";

const customStyles = {
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
};


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cities: [],
      text: '',
      information: '',
      coordinates: '',
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  };


  handleInput = (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  };

  addCity = (event) => {
    event.preventDefault();
    const newCity = {};
    if (this.state.text !== '') {
      // newCity.state.text = this.state.text;
      // newCity.state.information = this.state.information;
      // newCity.state.coordinates = this.state.coordinates;
      const cities = [...this.state.cities, newCity];
      this.setState({
        cities,
        text: ''
      })
    }
  };


  render() {
    const {isOpen, cities} = this.state;
    const modalData = {
      text: this.state.text,
      information: this.state.information,
      coordinates: this.state.coordinates,
    };

    return (
      <div className="App">
        <button className="btnAdd" onClick={this.toggleModal}>+</button>
        {cities.map((cities) => (
          <li className="CityItem" key={cities.id}>
            <Link to={`/city/${cities.id}`}>
              {cities.text}
              {cities.information}
              {cities.coordinates}
            </Link>
            <div className="btnItem">
              <button className="editCity" onClick={this.toggleModal}>V</button>
              <button className="delCity">х</button>
            </div>
          </li>
        ))}

        <ModalWindow
          isOpen={isOpen}
          handleOpen={this.toggleModal}
          style={customStyles}
          type="add"
          handleInput={this.handleInput}
          // currentItem={this.state.currentCity}
          modalData={modalData}
          addCity={this.addCity}
        />
      </div>
    );
  }
}

export default Home;