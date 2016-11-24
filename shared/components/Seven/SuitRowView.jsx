import React from 'react';

import { bindActionCreators } from 'redux';
import SuitRowActions from 'actions/Seven/SuitRowActions.js';
import { connect } from 'react-redux';
import { SuitRowFactory as SRF } from 'reducers/Seven/SuitRowFactory';

class SuitRowView extends React.Component {
  render(){
    const { row } = this.props;
    return (
        <div className="suitrow">
          <div className="suit-name">{SRF.suitName(row)}</div>
          <div className="suit-top">{row.get("top")}</div>
          <div className="suit-name">{row.get("bottom")}</div>
        </div>
    )
  }
}

export default SuitRowView;
