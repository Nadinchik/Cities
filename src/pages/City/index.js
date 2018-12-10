import React, { Component } from "react";
import { Link } from "react-router-dom";
import cities from "../../localeData";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityID: props.match.params.id,
    };
  }

  render() {
    const { cityID } = this.state;
    return (
      <div className="CitiesPage">
        <Link to='/'>Home</Link>
        {
          cities.map(item => {
            if (item.id === cityID) {
              return (
                <div key={Math.random()}>
                  <h1>{item.name}</h1>
                  <h3>{item.information}</h3>
                </div>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
};
export default City;