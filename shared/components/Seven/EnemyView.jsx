import React from 'react';

export default class EnemyView extends React.Component {
  render(){
    const { enemy } = this.props;
    return (
        <div className="seven-enemy-view">
          <div>name: {enemy.get("playerName")}</div>
          <div>cards: {enemy.get("playableCount")}</div>
          <div>closed: {enemy.get("closedCount")}</div>
        </div>
    )
  }
}
