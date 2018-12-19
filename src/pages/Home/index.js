import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
        popular: 0,
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
    const {city: {text, information, coordinates}, city, cities: source} = this.state;

    if ((text !== '') && (information !== '') && (coordinates !== '')) {
      const cities = _.cloneDeep(source);
      cities.push({...city, id: this.guid()});
      localStorage.setItem('cities', JSON.stringify(cities));

      this.setState(() => ({
        isOpen: false,
        cities,
        city: {
          text: '',
          information: '',
          coordinates: '',
          popular: 0,
          allAttractions: [],
          attraction: {
            title: '',
            description: '',
            rating: 0,
          },
        },
      }));
    }
  };

  editCity = (city) => {
    this.setState({city, isOpen: true, isEdit: true});
  };

  deleteCity = (id) => {
    const cities = [...this.state.cities];
    const updatedList = cities.filter(item => item.id !== id);
    this.setState({cities: updatedList});

    localStorage.setItem('cities', JSON.stringify(updatedList));
  };

  handleInput = (event) => {
    const {name, value} = event.target;
    this.setState(prevState => ({city: {...prevState.city, [name]: value}}));
  };

  sortingText = () => {
    const {cities: currentCities} = this.state;
    const cities = _.orderBy(currentCities, ['text'], ['asc', 'desc']);
    this.setState({cities});
  };

  sortingRating = () => {
    const {cities: currentCities} = this.state;
    const cities = _.orderBy(currentCities, ['popular'], ['asc', 'desc']);
    this.setState({cities});
  };


  render() {
    const { isOpen, cities, city, isEdit} = this.state;
    return (
        <div className="container">
          <div className="CitiesMain">
            <button className="btnAdd" onClick={this.toggleModal}>
              <span className="plus">+</span>
              <span className="btnAdd__title">Добавить город</span>
            </button>
            <ul>
              <div className="toolbar">
                <button className="btn btn-default" onClick={() => this.sortingText('text')}>
                  Sort by name
                </button>
                <button className="btn btn-default" onClick={() => this.sortingRating('popular')}>
                  Sort by rating
                </button>
              </div>
              {cities.length > 0 && cities.map((item) => (
                  <li className="CityItem" key={item.id}>
                    <Link to={`/city/${item.id}`}>
                      <div className="CityInform">
                        <span className="CityName">{item.text}</span>
                        <span className="CityRating">{item.popular}</span>
                      </div>
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
                  onClose={this.toggleModal}
              />
            </ModalWindow>
          </div>
        </div>
    );
  }
}

export default Home;

