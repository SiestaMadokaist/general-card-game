import { List, Map, fromJS } from 'immutable';
import { ADD } from 'actions/ChatActions';

const debug = fromJS({author: "me", text: "9999"})
const defaultState = List().push(debug);

export default function chatReducer(state = defaultState, action){
  if(action.type === ADD){
    const { author, imageUrl, text } = action;
    const map = fromJS({
      author,
      imageUrl,
      text
    })
    console.log(action);
    return state.push(map);
  }else{
    return state;
  }
}
