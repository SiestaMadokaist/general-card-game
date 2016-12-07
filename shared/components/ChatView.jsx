import React from 'react';
import { connect } from 'react-redux';
import { socket, socketJoin } from 'components/Seven/SocketConnection';
import { SCHAT, CCHAT } from 'components/Seven/SocketAction';

@connect(state => ({
  chats: state.chats
}))
export default class ChatView extends React.Component {
  constructor(props){
    super(props);
    this.addChat = (data) => {
      this.props.addChat(data.author, "", data.message);
    }
  }

  componentDidMount(){
    socketJoin(this.props.roomId)
    socket.on(SCHAT, this.addChat)
  }

  componentWillUnmount(){
    socket.off(SCHAT, this.addChat)
  }

  triggerChat(e, data){
    const { chats } = this.props;
    if(e.key === 'Enter'){
      const message = e.currentTarget.value;
      const { playerId, roomId } = this.props;
      socket.emit(CCHAT, {playerId, roomId, message});
      e.currentTarget.value = "";
    }
  }

  render(){
    const { chats } = this.props;
    return (
        <div className="chat-box">
          <div className="chat-box-title">Chat Message: </div>
          <div className="chat-message-wrapper">
            {
              chats.map((chat, index) => {
                return (
                    <div className="chat-message">
                      <span className="chat-message-pad">&nbsp;</span>
                      <span>{chat.get("author")}: </span>
                      <span>{chat.get("text")}</span>
                    </div>
                )
              })
            }
          </div>
          <div className="chat-input-box">
            <input type="text" placeholder="type something here" onKeyPress={this.triggerChat.bind(this)}></input>
          </div>
        </div>
    )
  }
}
