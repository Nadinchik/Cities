import React, {Component} from 'react';

class FormCities extends Component {

    render() {
        const {city: {text, information, coordinates}, onClose, handleInput, addCity, saveCity, isError, isEdit} = this.props;
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
                    {(isError) &&
                    <p className="validationForm">Поля не должны быть пустыми</p>
                    }

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