import React, {Component} from 'react'



class Index extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <h1>List cities {this.props.id}</h1>
    );
  }
}


export default Index
// class Index extends Component {
//   componentDidUpdate() {
//     this.props.inputCity.current.focus()
//   }
//   render() {
//     return (
//       <div className="CitiesMain">
//         <div className="header">
//           <form onSubmit={this.props.addCity}>
//             <input placeholder="City"
//               /* ref={this.props.inputCity}
//                value={this.props.currentCity.name}
//                onChange={this.props.handleInput}*/
//             />
//             <button type="submit"> Add city </button>
//           </form>
//         </div>
//         <h1>Moscow</h1>
//         <h1>Samara</h1>
//       </div>
//     )
//   }
// }


