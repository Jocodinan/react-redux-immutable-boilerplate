import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route } from "react-router";
import * as actions from './actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Test from './components/test/test';
import TestPage from './components/test/test-page';

export class Router extends Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route key="index" exact path='/' render={(props) => { return <Test {...this.props} {...props} /> }} />
            <Route key="page" exact path='/page' render={(props) => { return <TestPage {...this.props} {...props} /> }} />
          </div>
        </BrowserRouter>
      </div>
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