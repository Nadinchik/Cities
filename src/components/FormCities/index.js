import React, {Component} from 'react';

class FormCities extends Component {

  render() {
    const {city: {text, information, coordinates}, handleInput, addCity, saveCity, onClose, isEdit} = this.props;
    console.log(handleInput);
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
              <button
                  type="submit"
                  onClick={isEdit ? saveCity : addCity}
                  className={isEdit ? 'saveButton' : 'addButton'}
              >
                {isEdit ? 'Сохранить' : 'Добавить'}
              </button>

            </div>
            <button
                type="button"
                className="buttons closeBtn"
                onClick={onClose}
            >
              X
            </button>
          </form>
        </div>
    );
  }
}

export default FormCities;