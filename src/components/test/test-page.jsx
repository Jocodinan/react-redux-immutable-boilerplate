import React, { Component } from 'react';

export default class Test extends Component{
  render(){
    return (<button onClick={this.props.testClick}></button>);
  }
}