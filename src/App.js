import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import Home from "./pages/Home";
import City from "./pages/City";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/city/:id' component={City}/>
      </Switch>
    );
  }
}

export default withRouter(App);