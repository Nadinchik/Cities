import React, {Component} from 'react'
//import './App.css'
//import inputCities from './components/inputCities'
import Cities from './components/Cities'


class App extends Component {
  constructor() {
    super()
    this.state = {
      cities: [],
     /* currentCity: {
        name: '',
        id: '',
      },*/
      activeCity: 0,
    }
  }
/*  handleInput = e => {
    const itemName = e.target.value
    const currentCity = { name: itemName, id:'' }
    this.setState({
      currentCity,
    })
  }
  addCity = e => {
    e.preventDefault()
    const newCity = this.state.currentCity
    if (newCity.name !== '') {
      const cities = [...this.state.cities, newCity]
      this.setState({
        cities: cities,
        currentCity: { name: '', key: '' },
      })
    }
    console.log('Hello')
  }*/
  render() {
    //const activeCity = this.state.activeCity;
    return (
      <div className="App">
        <Cities id={'12345'}/>
        {CITIES.map((cities, index) => (
          <li
          key={index}
          onClick={() => {
            console.log('Clicked index '+index);
          }}
          >
            {cities.name}
          </li>
        ))}
        /*<Cities
          key={activeCity}
          id={CITIES[activeCity].id}
        />
        {CITIES.map((city, index) =>(
          <li
            key={index}
            onClick={ () => {
              console.log('Clicked index '+index);
            }}
          >
            {city.name}
          </li>
        ))}*/
      </div>
    );
  }
}



export default App
