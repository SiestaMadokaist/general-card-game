import React from 'react';
import { connect } from 'react-redux';
import { socket } from 'components/Seven/SocketConnection';

export default class ChatView extends React.Component {
  componentDidMount(){
    socket.on("server+chat", (data) => {
      this.props.addChat("", "", "...");
    })
  }

  triggerChat(e, data){
    const { chats } = this.props;
    if(e.key === 'Enter'){
      const message = e.currentTarget.value;
      const { playerId, roomId } = this.props;
      socket.emit("client+chat", {playerId, roomId, message});
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
