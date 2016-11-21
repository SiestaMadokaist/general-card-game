import React from 'react';
import Home from './Home';

class AppView extends React.Component{
  render(){
    return (
        <div id="app-view">
          {this.props.children}
        </div>
    )
  }
}

module.exports = AppView;
