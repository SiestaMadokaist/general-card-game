import React from 'react';

export default class EnemyView extends React.Component {
  render(){
    const { enemy } = this.props;
    return (
        <div className="seven-enemy-view">
          <div>{enemy.get("playableCount")}</div>
          <div>{enemy.get("closedCount")}</div>
        </div>
    )
  }
}
