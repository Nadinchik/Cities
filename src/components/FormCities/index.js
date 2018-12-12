import React, { Component } from "react";

class FormCities extends Component {

  render() {
    const { city: { text, information, coordinates }, handleInput, addCity, editCity } = this.props;
    return (
      <div className="FormAdd">
        <form>
          <input name="text"
                 type="text"
                 value={text}
                 onChange={handleInput}
                 placeholder="City"
          />
          <input name="information"
                 type="text"
                 value={information}
                 onChange={handleInput}
                 placeholder="Description"
          />
          <input name="coordinates"
                 type="text"
                 value={coordinates}
                 onChange={handleInput}
                 placeholder="Coordinates"
          />
          <button
            type="submit"
            onClick={addCity}
          >
            ADD CITY
          </button>
          <button
            type="submit"
            onClick={editCity}
          >
            Edit
          </button>
        </form>
      </div>
    );
  }
}

export default FormCities;