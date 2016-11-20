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
    const { todos, dispatch } = this.props;
    return (
        <div id="todo-list">
          <TodosView todos={todos} {...bindActionCreators(TodoActions, dispatch)} />
          <TodosForm {...bindActionCreators(TodoActions, dispatch)} />
        </div>
    );
  }
}

export default Home;
