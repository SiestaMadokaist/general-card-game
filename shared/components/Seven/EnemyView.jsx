import React from 'react';

export default class EnemyView extends React.Component {

  cardBackView(){
    return "http://example.com";
  }

  cardClosedView(){
    return "http://example.com";
  }

  render(){
    const { enemy } = this.props;
    return (
        <div className="seven-enemy-view">
          <span className="player-name">{enemy.get("playerName")}</span>
          <span className="available-card">&nbsp;</span>
          <span>{enemy.get("playableCount")}</span>
          <span className="closed-card">&nbsp;</span>
          <span>{enemy.get("closedCount")}</span>
        </div>
    )
  }
}
