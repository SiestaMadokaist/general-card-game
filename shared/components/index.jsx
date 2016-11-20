import React from 'react';
import Home from './Home';

class AppView extends React.Component{
  render(){
    return (
        <div id="app-view">
          <h1>Todos</h1>
          {this.props.children}
        </div>
    )
  }
}

module.exports = AppView;
