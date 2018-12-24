import React, {Component} from 'react';

class FormAttraction extends Component {

    render() {
        const {attraction: {title, description, rating}, onClose, handleInput, addAttr, saveAttraction, isError, isEdit} = this.props;

        return (
            <div className="FormAdd">
                <form>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={handleInput}
                        placeholder="Attraction"
                    />
                    <input
                        name="description"
                        type="text"
                        value={description}
                        onChange={handleInput}
                        placeholder="Description"
                    />
                    <input
                        name="rating"
                        type="number"
                        value={rating}
                        onChange={handleInput}
                        maxLength={5}
                        max={5}
                        min={0}
                    />
                    <span className="inputNumber">Введите рейтинг от 0 до 5</span>
                    <div className="buttons">
                        <button
                            type="submit"
                            onClick={isEdit ? saveAttraction : addAttr}
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

export default FormAttraction;