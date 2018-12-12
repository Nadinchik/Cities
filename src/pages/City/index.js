import React, {Component} from "react";
import {Link} from "react-router-dom";
import _ from 'lodash';
import ModalWindow from "../../components/Modal";



class City extends Component {
  constructor(props) {
    super(props);
    const arr = JSON.parse(localStorage.getItem('arr')) || [];
    this.state = {
      isOpen: false,
      arr,
      attraction: {
        title: "",
        description: "",
        rating: Number
      }
    };
  }

  addAttr = (e) => {
    e.preventDefault();
    const {arr: {title, description, rating}, attraction, arr: source} = this.state;

    if ((title !== "") && (description !== "") && (rating !== 0)) {
      const arr = _.cloneDeep(source);
      arr.push({...attraction, id: this.guid()});

      localStorage.setItem("arr", JSON.stringify(arr));

      this.setState(() => ({
        isOpen: false,
        arr,
        attraction: {
          title: "",
          description: "",
          rating: Number
        },
      }));
    }
  };

  editAttr = (attraction) => {
    this.setState({attraction, isOpen: true});
  };


  handleInput = (event) => {
    const {name, value} = event.target;
    this.setState(prevState => ({attraction: {...prevState.attraction, [name]: value}}));
  };


  deleteAttr = (id) => {
    const arr = [...this.state.arr];
    const updatedList = arr.filter(item => item.id !== id);
    this.setState({arr: updatedList});

    localStorage.setItem("arr", JSON.stringify(updatedList));
  };


  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const {text, information, coordinates, customStyles, attraction} = this.state;
    const {isOpen, arr} = this.state;
    console.log(this.state);
    return (
      <div>
        <Link to='/'>Home</Link>
        <div className='headerCity'>
          <button className="btnAdd" onClick={this.toggleModal}>+</button>
        </div>
        <div className='CityDescription'>
          <h1>{text}</h1>
          <h3>{information}</h3>
          <h3>{coordinates}</h3>
          <ul>
            {arr.length > 0 && arr.map((item) => (
              <li className="AttrItem" key={item.id}>
                <Link to={{
                  pathname: `/city/${item.id}`,
                  state: item,
                }}>
                  <span>{item.text}</span>
                  <span>{item.information}</span>
                  <span>{item.coordinates}</span>
                </Link>
                <div className="btnItem">
                  <button className="editAttr" onClick={() => this.editAttr(item)}>V</button>
                  <button className="delAttr" onClick={() => this.deleteAttr(item.id)}>х</button>
                </div>
              </li>
            ))
            }
          </ul>
          <ModalWindow
            isOpen={isOpen}
            handleOpen={this.toggleModal}
            style={customStyles}
            attraction={attraction}
            handleInput={this.handleInput}
            addCity={this.addAttr}
            editCity={this.editAttr}
          />
        </div>
      </div>
    );
  }
}

export default City;