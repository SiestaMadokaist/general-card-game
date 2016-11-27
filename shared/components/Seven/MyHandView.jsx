import React from 'react';
import CardView from './CardView';
import { connect } from 'react-redux';
import { Card } from 'reducers/Seven/CardFactory';


export default class MyHandView extends React.Component {
  render(){
    const { myHand } = this.props;
    return(
        <div className="seven-my-hand">
          <div className="seven-my-hand-cards-wrapper">
            {
              myHand
                .map((map, index) => {
                  return (<CardView card={Card.fromMap(map)} />)
                })
            }
          </div>
          <div className="float-clear"></div>
        </div>
    )
  }
}
