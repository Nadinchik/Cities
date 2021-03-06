import React, { Component } from 'react';

class FormAttraction extends Component {

    render() {
        const {attraction: {title, description, rating}, onClose, handleInput, checked, addAttr, saveAttraction, isError, isEdit} = this.props;

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
                        onKeyPress={checked}
                        maxLength={1}
                        max={5}
                        min={0}
                    />
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