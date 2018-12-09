import React, {Component} from 'react'

const CITIES = [
  {
    name: "Moscow",
    id: "94303",
    coordinates: '1111',
    information: 'Столица России',
    // popular:'',
    sight: [
      {
        title: 'Кремль',
        description: 'Кремль - крепость в центре Москвы и древнейшая её часть, главный общественно-политический и историко-художественный комплекс города, официальная резиденция Президента Российской Федерации. Расположен на высоком левом берегу Москвы-реки — Боровицком холме, при впадении в неё реки Неглинной.',
        rating: 5,
      }
    ]
  },
  {
    name: "Postov-on-Don",
    id: "94088",
    coordinates: '4523',
    information: 'dfxgbhd',
    // popular:'',
    sight: [
      {
        title: 'Кремль',
        description: 'Кремль - крепость в центре Москвы и древнейшая её часть, главный общественно-политический и историко-художественный комплекс города, официальная резиденция Президента Российской Федерации. Расположен на высоком левом берегу Москвы-реки — Боровицком холме, при впадении в неё реки Неглинной.',
        rating: 5,
      }
    ]
  },
  {
    name: "Samara",
    id: "95062",
    coordinates: '586',
    information: 'rfgh',
    // popular:'',
    sight: [
      {
        title: 'Кремль',
        description: 'Кремль - крепость в центре Москвы и древнейшая её часть, главный общественно-политический и историко-художественный комплекс города, официальная резиденция Президента Российской Федерации. Расположен на высоком левом берегу Москвы-реки — Боровицком холме, при впадении в неё реки Неглинной.',
        rating: 5,
      }
    ]
  },
  {
    name: "Novosibirsk",
    id: "96803",
    coordinates: '78352',
    information: 'edrfh',
    // popular:'',
    sight: [
      {
        title: 'Кремль',
        description: 'Кремль - крепость в центре Москвы и древнейшая её часть, главный общественно-политический и историко-художественный комплекс города, официальная резиденция Президента Российской Федерации. Расположен на высоком левом берегу Москвы-реки — Боровицком холме, при впадении в неё реки Неглинной.',
        rating: 5,
      }
    ]
  }
];

class Cities extends Component {
  constructor() {
    super();
   /* this.state = {
      CITIES: CITIES
    };*/
  }
  render() {
   // const CITIES = this.state.CITIES;
    return (
      //<div className="CitiesMain">
          <h1>List cities {this.props.id}</h1>
     // </div>
    );
  }
}

// class Cities extends Component {
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

export default Cities