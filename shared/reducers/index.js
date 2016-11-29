// export { default as todos } from "./TodoReducer";
import todos from './TodoReducer';
import suitrows from './Seven/SuitRowReducer';
import myHandReducers from './Seven/MyHandReducer';
import enemies from './Seven/EnemiesReducer';
import chats from './ChatReducer'

exports.todos = todos;
exports.suitrows = suitrows;
exports.myHand = myHandReducers;
exports.enemies = enemies;
exports.chats = chats;
