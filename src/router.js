import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route } from "react-router";

import Home from "./components/home/home";
import Page from "./components/page/page";

export default class Router extends Component {
  render(){
    return (
      <BrowserRouter>
        <div>
          <Route key="home" exact path='/' render={(props) => { return <Home {...this.props} {...props} /> }} />
          <Route key="page" exact path='/page' render={(props) => { return <Page {...this.props} {...props} /> }} />
        </div>
      </BrowserRouter>
    );
  }
}