import React, { Component } from 'react';

class FormAttraction extends Component {

  render() {
    const { attraction: { title, description, rating }, onClose,  handleInput, addAttr, editAttr, isEdit } = this.props;

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
                max={5}
                min={0}
            />
            <div className="buttons">
              {
                isEdit ?
                    <button
                        type="submit"
                        onClick={editAttr}
                        className="saveButton"
                    >
                      Сохранить
                    </button> :
                    <button
                        type="submit"
                        onClick={addAttr}
                        className="addButton"
                    >
                      Добавить
                    </button>
              }

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

export default FormAttraction;