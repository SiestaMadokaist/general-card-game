import React from 'react';
import { connect } from 'react-redux';
@connect(state => ({}))
export default class ChatView extends React.Component {
  triggerChat(e, data){
    if(e.key === 'Enter'){
      this.props.addChat("TODO", "", e.currentTarget.value);
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
