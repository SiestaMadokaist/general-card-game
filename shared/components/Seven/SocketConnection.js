import ChatActions from 'actions/ChatActions';
import { socketServer } from 'config';
import io from 'socket.io-client';
import assert from 'underscore.assert';
import { CJOIN } from 'components/Seven/SocketAction';

const socket = io(`${socketServer}/7Spade`);
const state = {
  roomId: undefined
};

exports.socket = socket;
exports.socketJoin = (roomId) => {
  if(state.roomId === undefined){
    socket.emit(CJOIN, {roomId});
    state.roomId = roomId;
  }
}
