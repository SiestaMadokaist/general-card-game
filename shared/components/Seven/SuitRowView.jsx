import React from 'react';

import { bindActionCreators } from 'redux';
import SuitRowActions from 'actions/Seven/SuitRowActions.js';
import { connect } from 'react-redux';
import { SuitRowFactory as SRF } from 'reducers/Seven/SuitRowFactory';

class SuitRowView extends React.Component {
  render(){
    const { row } = this.props;
    return (
        <div className="seven-suitrow">
          <div className="seven-suitrow-center">
            <div className="suit-name">{SRF.suitName(row)}</div>
            <div className="suit-top">top: {row.get("top")}</div>
            <div className="suit-name">bottom: {row.get("bottom")}</div>
          </div>
        </div>
    )
  }
}

export default SuitRowView;
