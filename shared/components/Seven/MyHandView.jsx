import React from 'react';
import CardView from './CardView';
import MyHandActions from 'actions/Seven/MyHandActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'reducers/Seven/CardFactory';


@connect(state => ({}))
export default class MyHandView extends React.Component {
  render(){
    const { myHand, dispatch } = this.props;
    const { playerId, roomId } = this.props;
    return(
        <div className="seven-my-hand">
          <div className="seven-my-hand-cards-wrapper">
            {
              myHand
                .map((map, index) => {
                  return (<CardView playerId={playerId} roomId={roomId} card={Card.fromMap(map)} {...bindActionCreators(MyHandActions, dispatch)}/>)
                })
            }
          </div>
          <div className="float-clear"></div>
        </div>
    )
  }
}
