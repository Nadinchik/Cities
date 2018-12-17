import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './styles.scss';
import ModalWindow from '../../components/Modal';
import FormCities from '../../components/FormCities';


class Home extends Component {
  constructor(props) {
    super(props);
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    this.state = {
      isEdit: false,
      isOpen: false,
      cities,
      city: {
        text: '',
        information: '',
        coordinates: '',
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
      isEdit: false,
    }));
  };


  addCity = (e) => {
    e.preventDefault();
    const { city: { text, information, coordinates }, city, cities: source } = this.state;

    if ((text !== '') && (information !== '') && (coordinates !== '')) {
      const cities = _.cloneDeep(source);
      cities.push({ ...city, id: this.guid() });
      localStorage.setItem('cities', JSON.stringify(cities));

      this.setState(() => ({
        isOpen: false,
        cities,
        city: {
          text: '',
          information: '',
          coordinates: '',
        },
      }));
    }
  };

  editCity = (city) => {
    this.setState({ city, isOpen: true, isEdit: true });
  };

  deleteCity = (id) => {
    const cities = [...this.state.cities];
    const updatedList = cities.filter(item => item.id !== id);
    this.setState({ cities: updatedList });

    localStorage.setItem('cities', JSON.stringify(updatedList));
  };


  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({ city: { ...prevState.city, [name]: value } }));
  };


  render() {
    const { isOpen, cities, city, isEdit } = this.state;
    return (
        <div className="container">
          <div className="CitiesMain">
            <button className="btnAdd" onClick={this.toggleModal}>
              <span className="plus">+</span>
              <span className="btnAdd__title">Добавить город</span>
            </button>
            <ul>
              {cities.length > 0 && cities.map((item) => (
                  <li className="CityItem" key={item.id}>
                    <Link to={{
                      pathname: `/city/${item.id}`,
                      state: item,
                    }}>
                      <span className="CityName">{item.text}</span>
                    </Link>
                    <div className="btnItem">
                      <button className="editCity" onClick={() => this.editCity(item)}>Редактировать
                      </button>
                      <button className="delCity" onClick={() => this.deleteCity(item.id)}>Удалить
                      </button>
                    </div>
                  </li>
              ))
              }
            </ul>
            <ModalWindow
                isOpen={isOpen}
                handleOpen={this.toggleModal}
            >
              <FormCities
                  city={city}
                  handleInput={this.handleInput}
                  addCity={this.addCity}
                  editCity={this.editCity}
                  isEdit={isEdit}
              />
            </ModalWindow>
          </div>
        </div>
    );
  }
}

export default Home;