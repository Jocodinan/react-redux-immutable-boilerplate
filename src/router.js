import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route } from "react-router";
import * as actions from './actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from "./components/home/home";
import Page from "./components/page/page";

export class Router extends Component {
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

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);