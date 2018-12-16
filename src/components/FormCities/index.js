import React, { Component } from 'react';

class FormCities extends Component {

  render() {
    const { city: { text, information, coordinates }, handleInput, addCity, editCity, isEdit } = this.props;
    return (
      <div className="FormAdd">
        <form>
          <input
            name="text"
            type="text"
            value={text}
            onChange={handleInput}
            placeholder="City"
          />
          <textarea
            name="information"
            value={information}
            onChange={handleInput}
            placeholder="Description"
          />
          <input
            name="coordinates"
            type="text"
            value={coordinates}
            onChange={handleInput}
            placeholder="Coordinates"
          />
          <div className="buttons">

            {
              isEdit ?
                <button
                  type="submit"
                  onClick={editCity}
                  className="saveButton"
                >
                  Сохранить
                </button> :
                <button
                  type="submit"
                  onClick={addCity}
                  className="addButton"
                >
                  Добавить
                </button>
            }

          </div>

        </form>
      </div>
    );
  }
}

export default FormCities;