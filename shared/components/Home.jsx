import React from 'react';
import TodosView from './TodosView';
import TodosForm from './TodosForm';
import SuitRow from './Seven.SuitRow.jsx';
import SuitRowActions  from 'actions/Seven.SuitrowActions';
import { bindActionCreators } from 'redux';
import { TodoActions } from 'actions';
import { connect } from 'react-redux';

@connect(state => ({todos: state.todos}))
class Home extends React.Component {
  render(){
    const { rows, dispatch } = this.props;
    return (
        <div id="suitrow-list">
          <SuitRow rowName="DIAMOND" {...bindActionCreators(SuitRowActions, dispatch)} rows={rows}/>
          <SuitRow rowName="CLOVER" {...bindActionCreators(SuitRowActions, dispatch)} rows={rows} />
          <SuitRow rowName="HEART" {...bindActionCreators(SuitRowActions, dispatch)} rows={rows} />
          <SuitRow rowName="SPADE" {...bindActionCreators(SuitRowActions, dispatch)} rows={rows} />
        </div>
    );
  }
}

export default Home;
