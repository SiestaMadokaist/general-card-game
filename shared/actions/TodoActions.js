const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";

function createTodo(text){
  return {
    type: CREATE_TODO,
    text,
    date: Date.now()
  };
}

function editTodo(id, text){
  return {
    type: EDIT_TODO,
    id,
    text,
    date: Date.now()
  };
}

function deleteTodo(id){
  return {
    type: DELETE_TODO,
    id
  };
}

exports.createTodo = createTodo;
exports.editTodo = editTodo;
exports.deleteTodo = deleteTodo;
exports.DELETE_TODO = DELETE_TODO;
exports.CREATE_TODO = CREATE_TODO;
exports.EDIT_TODO = EDIT_TODO;
