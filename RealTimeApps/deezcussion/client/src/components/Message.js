import React from "react";
import * as timeago from 'timeago.js';

const Message = ({message, own}) => {
  const ownClass = own ? 'right' : 'left';
  const simplified = message.author || ''; 
  return (
    message.author ?
    <div className={`chat-message ${ownClass}`}>
      <img className="message-avatar" src={`https://eu.ui-avatars.com/api/?name=${simplified}`} alt="" />
      <div className="message">
        <p className="message-author text-primary">{message.author}</p>
        <span className="message-date">{timeago.format(message.sentAt)}</span>
        <span className="message-content">{message.content}</span>
      </div>
    </div>
    :
    <div className="d-flex justify-content-center">
      <div className="d-inline-block bg-light p-2 mt-2 border rounded">
        <p>{message.content}</p>
      </div>
    </div>
  );
}

export default Message;