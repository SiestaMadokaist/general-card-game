import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SuitRowsView from 'components/Seven/SuitRowsView';
import SuitRowActions from 'actions/Seven/SuitRowActions';

import MyHandView from 'components/Seven/MyHandView';
import MyHandActions from 'actions/Seven/MyHandActions';

import EnemiesView from 'components/Seven/EnemiesView';
import EnemiesActions from 'actions/Seven/EnemiesActions';

import ChatView from 'components/ChatView';
import ChatActions from 'actions/ChatActions';

@connect(state => ({
  suitrows: state.suitrows,
  enemies: state.enemies,
  myHand: state.myHand,
  chats: state.chats
}))
export default class SevenView extends React.Component {
  render(){
    const { chats, suitrows, enemies, myHand, dispatch } = this.props;
    return (
      <div className="seven-wrapper">
        <div className="seven-left-view">
          <EnemiesView enemies={enemies} {...bindActionCreators(EnemiesActions, dispatch)} />
        </div>
        <div className="seven-mid-view">
          <SuitRowsView suitrows={suitrows} {...bindActionCreators(SuitRowActions, dispatch)} />
          <MyHandView myHand={myHand} {...bindActionCreators(MyHandActions, dispatch)} />
        </div>
        <div className="seven-right-view">
          <ChatView chats={chats} {...bindActionCreators(ChatActions, dispatch)} />
        </div>
        <div className="float-clear" />
     </div>
    )
  }
}

