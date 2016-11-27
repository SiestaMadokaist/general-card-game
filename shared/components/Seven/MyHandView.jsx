import React from 'react';
import CardView from './CardView';
import { connect } from 'react-redux';
import { Card } from 'reducers/Seven/CardFactory';


export default class MyHandView extends React.Component {
  render(){
    const { myHand } = this.props;
    return(
        <div className="seven-my-hand">
          {
            myHand
              .map(Card.fromMap)
              .map((card, index) => {
                return (<CardView card={card} />)
              })
          }
          <div className="float-clear"></div>
        </div>
    )
  }
}
