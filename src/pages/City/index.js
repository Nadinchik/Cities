import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ModalWindow from '../../components/Modal';
import FormAttraction from '../../components/FormAttraction';


class City extends Component {
  constructor(props) {
    super(props);
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const currentCity = _.find(cities, { id: props.match.params.id });
    this.state = {
      isEdit: false,
      isOpen: false,
      cities,
      currentCity,
      attraction: {
        title: '',
        description: '',
        rating: 0,
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


  addAttr = (e) => {
    e.preventDefault();
    const { attraction, attraction: { title, description, rating }, cities, currentCity } = this.state;

    if ((title !== '') && (description !== '') && (rating !== 0)) {
      let arr = _.cloneDeep(currentCity.allAttractions || []);
      arr.push({ ...attraction, id: this.guid() });
      const data = {
        ...currentCity,
        allAttractions: arr,
        popular: this.calcRating(arr),
      };
      cities.forEach(({ id, allAttractions }, index) => {
        if (id === currentCity.id) {
          cities[index] = data;
        }
      });
      localStorage.setItem('cities', JSON.stringify(cities));

      this.setState((prevState) => ({
        ...prevState,
        isOpen: false,
        allAttractions: arr,
        currentCity: data,
        attraction: {
          title: '',
          description: '',
          rating: 0,
        },
      }));
    }
  };

  editAttr = (attraction) => {
    this.setState({ attraction, isOpen: true, isEdit: true });
  };


  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({ attraction: { ...prevState.attraction, [name]: value } }));
  };


  deleteAttr = (id) => {
    const { allAttractions } = this.state.currentCity;
    const updatedList = allAttractions.filter(item => item.id !== id);
    this.saveCities(updatedList);
  };

  calcRating = (arr) => {
    let sum = 0;
    arr.forEach(({rating}) => {
      if(arr.rating === null){return sum = 0}
      sum += _.toNumber(rating)
    });
    return _.floor(sum/arr.length);
  };

  saveCities = (arr) => {
    const {cities, currentCity} = this.state;

    const data = {
      ...currentCity,
      allAttractions: arr,
      popular: this.calcRating(arr)
    };

    cities.forEach(({ id, allAttractions }, index) => {
      if (id === currentCity.id) {
        cities[index] = data;
      }
    });
    localStorage.setItem('cities', JSON.stringify(cities));

    this.setState((prevState) => ({
      ...prevState,
      isOpen: false,
      allAttractions: arr,
      currentCity: data,
      attraction: {
        title: '',
        description: '',
        rating: 0,
      },
    }));
  };


  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      isEdit: false,
    }));
  };

  render() {
    console.log('---', this.state);
    const { isOpen, attraction, isEdit, currentCity: { text, information, coordinates, popular, allAttractions } } = this.state;
    return (
        <div className="container">
          <div className="LinkGoBack">
            <Link to="/">Назад</Link>
          </div>
          <div className="headerCity">
            <button className="btnAdd" onClick={this.toggleModal}>
              <span className="plus">+</span>
              <span className="btnAdd__title">Добавить достопримечательность</span>
            </button>
          </div>
          <div className="CityDescription">
            <h1>{text}</h1>
            <p><span>Информация:</span> {information}</p>
            <p><span>Координаты:</span> {coordinates}</p>
            <p><span>Популярность:</span> {popular}</p>
            <ul className="ListAttraction">
              {allAttractions && allAttractions.length > 0 && allAttractions.map((item) => (
                  <li className="AttrItem" key={item.id}>
                    <div>
                      <h4>Достопримечательность: {item.title}</h4>
                      <p>Описание: {item.description}</p>
                      <h4>Рейтинг: {item.rating}</h4>
                    </div>
                    <div className="btnItem">
                      <button className="editCity" onClick={() => this.editAttr(item)}>Редактировать
                      </button>
                      <button className="delCity" onClick={() => this.deleteAttr(item.id)}>Удалить
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
              <FormAttraction
                  attraction={attraction}
                  handleInput={this.handleInput}
                  addAttr={this.addAttr}
                  editCity={this.editAttr}
                  isEdit={isEdit}
                  onClose={this.toggleModal}
              />
            </ModalWindow>
          </div>
        </div>
    );
  }
}

export default City;