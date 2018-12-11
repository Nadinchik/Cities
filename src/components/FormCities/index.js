import React, {Component} from "react";

class FormCities extends Component {
  render() {
    return (
      <div className="FormAdd">
        <form>
          <input name="text"
                 type="text"
                 value={this.props.modalData.text}
                 onChange={this.props.handleInput}
                 placeholder="City"
          />
          <input name="information"
                 type="text"
                 value={this.props.modalData.information}
                 onChange={this.props.handleInput}
                 placeholder="Description"
          />
          <input name="coordinates"
                 type="text"
                 value={this.props.modalData.coordinates}
                 onChange={this.props.handleInput}
                 placeholder="Coordinates"
          />
          <button
            type="submit"
            onClick={this.addCity}
          >
            ADD CITY
          </button>
        </form>
      </div>
    )
  }
}

export default FormCities;