import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import './styles.scss';
import ModalWindow from '../../components/Modal';
import FormCities from '../../components/FormCities';


class Home extends Component {
    constructor(props) {
        super(props);
        const citiesSource = JSON.parse(localStorage.getItem('cities')) || [];
        const cities = _.orderBy(citiesSource, ['text'], 'asc');
        this.state = {
            isEdit: false,
            isOpen: false,
            isError: true,
            sortType: 'text',
            sortByText: 'asc',
            sortByRating: 'asc',
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
            isError: false,
        }));
    };


    addCity = (e) => {
        e.preventDefault();
        const {city: {text, information, coordinates}, city, cities: source} = this.state;
        if ((text.trim() || text.length >= 30) &&
            (information.trim() || information.length >= 30) &&
            (coordinates.trim() || coordinates.length >= 30)){
            const cities = _.cloneDeep(source);
            cities.push({...city, id: this.guid()});
            localStorage.setItem('cities', JSON.stringify(cities));

            this.setState(() => ({
                isOpen: false,
                isError: false,
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
            }), () => this.currentSort());
        } else {
            this.setState({isError: true})
        }
    };

    editCity = (city) => {
        this.setState({city, isOpen: true, isEdit: true});
    };


    saveCity = (event) => {
        event.preventDefault();
        const {cities, city, city: {text, information, coordinates}} = this.state;
        if ((text.trim() || text.length >= 30) &&
            (information.trim() || information.length >= 30) &&
            (coordinates.trim() || coordinates.length >= 30)) {
            const data = {
                ...city,
            };

            cities.forEach(({id}, index) => {
                if (id === city.id) {
                    cities[index] = data;
                }
            });
            localStorage.setItem('cities', JSON.stringify(cities));

            this.setState((prevState) => ({
                ...prevState,
                isOpen: false,
                isEdit: false,
                cities,
                city: data,
            }), () => this.currentSort());
        } else {
            this.setState({isError: true})
        }
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
        const {cities: currentCities, sortByText: currentOrder} = this.state;
        const sortByText = currentOrder === 'asc' ? 'desc' : 'asc';
        const cities = _.orderBy(currentCities, ['text'], [sortByText]);
        this.setState({cities, sortByText, sortType: 'text'});
    };

    sortingRating = () => {
        const {cities: currentCities, sortByRating: currentOrder} = this.state;
        const sortByRating = currentOrder === 'asc' ? 'desc' : 'asc';
        const cities = _.orderBy(currentCities, ['popular'], [sortByRating]);
        this.setState({cities, sortByRating, sortType: 'rating'});
    };

    currentSort = () => {
        const {cities: currentCities, sortType, sortByRating, sortByText} = this.state;
        const cities = _.orderBy(currentCities, [sortType], [sortType === 'text' ? sortByText : sortByRating]);
        this.setState({cities})
    };

    render() {
        const {isOpen, cities, city, isEdit, isError, sortByText, sortByRating, sortType} = this.state;
        return (
            <div className="container">
                <div className="CitiesMain">
                    <button className="btnAdd" onClick={this.toggleModal}>
                        <span className="plus">+</span>
                        <span className="btnAdd__title">Добавить город</span>
                    </button>
                    <div className="toolbar">
                        <button className={sortType === 'text' && 'btn btn-default active'} onClick={this.sortingText}>
                            Sort by name {sortByText === 'asc' ? '▲' : '▼'}
                        </button>
                        <button className={sortType === 'rating' && 'btn btn-default active'}
                                onClick={this.sortingRating}>
                            Sort by rating {sortByRating === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    <ul>
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
                        sortByText={this.sortingText}
                        sortingRating={this.sortingRating}
                    >
                        <FormCities
                            city={city}
                            handleInput={this.handleInput}
                            addCity={this.addCity}
                            onClose={this.toggleModal}
                            saveCity={this.saveCity}
                            isEdit={isEdit}
                            isError={isError}
                        />
                    </ModalWindow>
                </div>
            </div>
        );
    }
}

export default Home;

