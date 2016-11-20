import React from 'react';

import { bindActionCreators } from 'redux';
import { SuitRowActions } from 'actions/Seven.SuitRowActions';
import { connect } from 'react-redux';

@connect(state => ({ row: state.row }))
class SuitRow extends React.Component {
  render(){
    const { rows, dispatch, rowName } = this.props;
    const row = rows[rowName];
    return (
        <div class="suitrow" data-name={rowName}>
          <span>{row.top}</span>
          <span>{row.bottom}</span>
        </div>
    )
  }
}

export default SuitRow;
