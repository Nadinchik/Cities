import React, { Component } from "react";

class FormAttraction extends Component {

  render() {
    const { attraction: { title, description, rating }, handleInput, addAttr, editAttr } = this.props;

    return (
      <div className="FormAdd">
        <form>
          <input name="text"
                 type="text"
                 value={title}
                 onChange={handleInput}
                 placeholder="Attraction"
          />
          <input name="Description"
                 type="text"
                 value={description}
                 onChange={handleInput}
                 placeholder="Description"
          />
          <input name="coordinates"
                 type="number"
                 value={rating}
                 onChange={handleInput}
          />
          <button
            type="submit"
            onClick={addAttr}
          >
            ADD
          </button>
          <button
            type="submit"
            onClick={editAttr}
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default FormAttraction;