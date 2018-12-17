import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ModalWindow from '../../components/Modal';
import FormAttraction from '../../components/FormAttraction';


class City extends Component {
  constructor(props) {
    super(props);
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    this.state = {
      isEdit: false,
      isOpen: false,
      cities,
      allAttractions: [],
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
    const { attraction, attraction: { title, description, rating }, allAttractions } = this.state;

    if ((title !== '') && (description !== '') && (rating !== 0)) {
      let arr = _.cloneDeep(allAttractions);
      arr.push({ ...attraction, id: this.guid() });

      // localStorage.setItem('arr', JSON.stringify(arr));

      this.setState(() => ({
        isOpen: false,
        allAttractions: arr,
        attraction: {
          title: '',
          description: '',
          rating: 0,
        },
      }));
    }
  };

  editAttr = (attraction) => {
    this.setState({ attraction, isOpen: true, isEdit: true  });
  };


  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({ attraction: { ...prevState.attraction, [name]: value } }));
  };


  deleteAttr = (id) => {
    const arr = [...this.state.arr];
    const updatedList = arr.filter(item => item.id !== id);
    this.setState({ arr: updatedList });

    localStorage.setItem('arr', JSON.stringify(updatedList));
  };


  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      isEdit: false,
    }));
  };

  render() {
    const { text, information, coordinates, customStyles } = this.props.location.state;
    const { isOpen, allAttractions, attraction, isEdit } = this.state;
    return (
        <div className="container">
          <Link to="/">Home</Link>
          <div className="headerCity">
            <button className="btnAdd" onClick={this.toggleModal}>
              <span className="plus">+</span>
              <span className="btnAdd__title">Добавить достопримечательность</span>
            </button>
          </div>
          <div className="CityDescription">
            <h1>Название города: {text}</h1>
            <p>Информация: {information}</p>
            <h6>Координаты: {coordinates}</h6>
            <ul>
              {allAttractions.length > 0 && allAttractions.map((item) => (
                  <li className="AttrItem" key={item.id}>
                    <div>
                      <h6>Достопримечательность: {item.title}</h6>
                      <p>Описание: {item.description}</p>
                      <h6>Рейтинг: {item.rating}</h6>
                    </div>
                    <div className="btnItem">
                      <button className="editAttr" onClick={() => this.editAttr(item)}>EDIT</button>
                      <button className="delAttr" onClick={() => this.deleteAttr(item.id)}>х</button>
                    </div>
                  </li>
              ))
              }
            </ul>
            <ModalWindow
                isOpen={isOpen}
                handleOpen={this.toggleModal}
                style={customStyles}
            >
              <FormAttraction
                  attraction={attraction}
                  handleInput={this.handleInput}
                  addAttr={this.addAttr}
                  editCity={this.editAttr}
                  isEdit={isEdit}
              />
            </ModalWindow>
          </div>
        </div>
    );
  }
}

export default City;