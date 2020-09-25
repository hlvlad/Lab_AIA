import React from "react";

const User = ({user}) => {
  const simplified = user.split(' ').join('+');
  return (
    <div className="chat-user">
      <img className="chat-avatar" src={`https://eu.ui-avatars.com/api/?name=${simplified}`} alt="" />
      <div className="chat-user-name">
        <p>{user}</p>
      </div>
    </div>
  );
}

export default User;
