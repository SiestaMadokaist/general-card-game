import React from 'react';

import { bindActionCreators } from 'redux';
import SuitRowActions from 'actions/Seven/SuitRowActions';
import SuitRowView from './SuitRowView';
import { connect } from 'react-redux';

@connect(state => ({suitrows: state.suitrows }))
class SuitRowsView extends React.Component {
  render(){
    const { dispatch, suitrows } = this.props;
    return (
        <div className="seven-suitrows">
          {
            suitrows.map((row, index) => {
              return (
                  <SuitRowView data-id={index} row={row} />
              )
            })
          }
          <div className="float-clear"></div>
        </div>
    )
  }
}

export default SuitRowsView;
