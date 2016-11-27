import React from 'react';
import EnemyView from 'components/Seven/EnemyView';
import { bindActionCreators } from 'redux';
import EnemiesActions from 'actions/Seven/EnemiesActions';

export default class EnemiesView extends React.Component {
  render(){
    const { enemies, dispatch } = this.props;
    return (
        <div className="enemies-view">
          {
            enemies.map((enemy, index)=> {
              return (<EnemyView enemy={enemy} {...bindActionCreators(EnemiesActions, dispatch)} />) 
            })
          }
        </div>
    )
  }
}
