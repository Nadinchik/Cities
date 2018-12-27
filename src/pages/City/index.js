import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import guid from '../../helpers'
import ModalWindow from '../../components/Modal';
import FormAttraction from '../../components/FormAttraction';
// import AttractionItem from '../../components/AttractionItem';


class City extends Component {
    constructor(props) {
        super(props);

        const cities = JSON.parse(localStorage.getItem('cities')) || [];
        const currentCity = _.find(cities, {id: props.match.params.id});
        this.state = {
            isEdit: false,
            isOpen: false,
            isError: true,
            cities,
            currentCity,
            attraction: {
                title: '',
                description: '',
                rating: 0,
            },
        };
    }


    addAttr = (e) => {
        e.preventDefault();
        const {attraction, attraction: {title, description, rating}, cities, currentCity} = this.state;

        if ((title.trim() || title.length >= 30) &&
            (description.trim() || description.length >= 30) &&
            (rating.trim() || rating.length >= 5)) {
            let arr = _.cloneDeep(currentCity.allAttractions || []);
            arr.push({...attraction, id: guid()});
            const data = {
                ...currentCity,
                allAttractions: arr,
                popular: this.calcRating(arr),
            };
            cities.forEach(({id, allAttractions}, index) => {
                if (id === currentCity.id) {
                    cities[index] = data;
                }
            });
            localStorage.setItem('cities', JSON.stringify(cities));

            this.setState(() => ({
                isOpen: false,
                isError: false,
                allAttractions: arr,
                currentCity: data,
                attraction: {
                    title: '',
                    description: '',
                    rating: 0,
                },
            }));
        } else {
            this.setState({isError: true})
        }
    };

    editAttr = (attraction) => {
        this.setState({
            attraction,
            isOpen: true,
            isEdit: true
        });
    };


    handleInput = (event) => {
        const {name, value} = event.target;
        this.setState(prevState => ({attraction: {...prevState.attraction, [name]: value}}));
    };


    deleteAttr = (id) => {
        const {allAttractions} = this.state.currentCity;
        const updatedList = allAttractions.filter(item => item.id !== id);

        this.saveCities(updatedList);
    };

    calcRating = (arr) => {
        let result = arr.reduce((sum, {rating}) => {
            return sum + _.toNumber(rating)
        }, 0);
        return _.floor(result / arr.length);
    };


    saveCities = (arr) => {
        const {cities, currentCity} = this.state;
        const data = {
            ...currentCity,
            allAttractions: arr,
            popular: this.calcRating(arr)
        };

        cities.some(({id, allAttractions}, index) => {
            if (id === currentCity.id) {
                cities[index] = data;
                return true
            } else return false
        });

        localStorage.setItem('cities', JSON.stringify(cities));

        this.setState((prevState) => ({
            ...prevState,
            isOpen: false,
            isError: false,
            allAttractions: arr,
            currentCity: data,
            attraction: {
                title: '',
                description: '',
                rating: 0,
            },
        }));
    };

    saveAttraction = (event) => {
        event.preventDefault();
        const {currentCity: {allAttractions}, attraction, attraction: {id, title, description, rating}} = this.state;
        if ((title.trim() || title.length >= 30) &&
            (description.trim() || description.length >= 30) &&
            (rating.trim() || rating.length >= 5)) {

            let arr = _.cloneDeep(allAttractions);
            let Index = -1;
            arr.forEach(({id: itemId}, index) => {
                if (itemId === id) {
                    Index = index;
                }
            });
            if (Index >= 0) {
                arr.splice(Index, 1, attraction);
            }
            this.saveCities(arr);
        }
    };


    toggleModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            isEdit: false,
            isError: false,
        }));
    };

    checked = (event) => {
        event.preventDefault();
    };


    render() {
        const {
            isOpen, attraction, isEdit, isError,
            currentCity: {text, information, coordinates, popular, allAttractions}
        } = this.state;
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
                            // return <AttractionItem
                            //     key={item.id}
                            //     title={item.title}
                            //     description={item.description}
                            //     rating={item.rating}
                            //     editAttr={this.editAttr}
                            //     deleteAttr={this.deleteAttr}
                            // />
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
                            onClose={this.toggleModal}
                            isEdit={isEdit}
                            saveAttraction={this.saveAttraction}
                            isError={isError}
                            checked={this.checked}
                        />
                    </ModalWindow>
                </div>
            </div>
        );
    }
}

export default City;