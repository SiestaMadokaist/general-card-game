import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SuitRowsView from 'components/Seven/SuitRowsView';
import OpponentsHandView from 'components/Seven/OpponentsHandView';
import MyHandView from 'components/Seven/MyHandView';
import SuitRowActions from 'actions/Seven/SuitRowActions';
import HandActions from 'actions/Seven/HandActions';

@connect(state => ({
  suitrows: state.suitrows,
  enemies: state.enemies,
  me: state.me
}))
export default class SevenView extends React.Component {
  render(){
    const { suitrows, enemies, me, dispatch } = this.props;
    return (
      <div className="seven-wrapper">
         <SuitRowsView suitrows={suitrows} {...bindActionCreators(SuitRowActions, dispatch)} />
         <OpponentsHandView enemies={enemies} {...bindActionCreators(HandActions, dispatch)} />
         <MyHandView me={me} {...bindActionCreators(HandActions, dispatch)} />
     </div>
    )
  }
}

