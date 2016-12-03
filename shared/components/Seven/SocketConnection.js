import io from 'socket.io-client';
import { socketServer, } from 'config';
import ChatActions from 'actions/ChatActions';
const socket = io(`${socketServer}/SEVEN`);

exports.socket = socket;
exports.socketStore = function(store){
  const { addChat } = ChatActions;
  socket.on("chat", (data) => {
    // console.log(data.playerId, data.message);
    store.dispatch(addChat(data.playerId, "", data.message))
  })
};
