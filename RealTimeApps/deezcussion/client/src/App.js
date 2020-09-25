import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import User from "./components/User";
import Message from "./components/Message";

import './App.css';

const port = process.env.PORT || 5000;
const socket = io(`http://localhost:${port}`);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [myName, setMyName] = useState('');
  const [input, setInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on('message', message => {
      addMessage(message);
    });
    socket.on('user joined', username => addUser(username)); 
    socket.on('user left', username => removeUser(username));
    socket.on('user list', list => setUsers(list))
  }, []);

  const sendMessage = (message) => {
    socket.emit('message', message);
  }

  const addUser = (username) => {
    setUsers(u => [...u, username]); 
    addMessage({content: `${username} joined the chat.`});
  }

  const addMessage = (message) => {
    setMessages(m => [...m, message]);
  }

  const removeUser = (username) => { 
    setUsers(users => users.filter(user => user !== username));
    addMessage({content: `${username} left the chat.`});
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleLoginChange = (e) => {
    setMyName(e.target.value);
  }

  const handleInputSubmit = (e) => {
    e.preventDefault();
    sendMessage({author: myName, content: input, sentAt: Date.now()});
    setInput('');
  }

  const handleLoginSubmit = (e) => {
    socket.emit("login", myName);
    setIsLoggedIn(true);
    e.preventDefault();
  }

  return ( 
    <Container>
      {isLoggedIn ?
        <div className="wrapper wrapper-content animated fadeInRight">
          <Row>
            <Col lg={12}>
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <strong>Dizzcussion</strong>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="ibox chat-view">
                <div className="ibox-content">
                  <Row>
                    <Col md={9}>
                      <div className="chat-discussion">
                        {messages && messages.map(message => (
                          <Message message={message} own={message.author === myName}>{message.text}</Message>
                        ))}
                      </div>
                      <Form className="chat-message-form" onSubmit={handleInputSubmit}>
                          <Form.Control as="textarea" value={input} placeholder="Enter message text and press enter" onChange={handleInputChange} required/>
                          <Button type="submit" className="mt-3">Send</Button>
                      </Form>
                    </Col>
                    <Col md={3}>
                      <div className="chat-users">
                        <div className="user-list">
                          {users && users.map(user => (
                            <User user={user}/>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
            </Col>
          </Row>
        </div>
      :
      <Row className="h-100 align-items-center">
        <Col>
          <Form inline className="justify-content-center" onSubmit={handleLoginSubmit}>
            <Form.Control size="lg" placeholder="Enter login" value={myName} onChange={handleLoginChange} required/>
            <Button className="ml-2" type="submit">Enter Chat</Button>
          </Form>
        </Col>
      </Row>
    }
    </Container>
  );
}

export default App;