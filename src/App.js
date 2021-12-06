import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import ToastContainer from 'react-bootstrap/ToastContainer';
import ToastAutohideable from './ToastAutohideable';
import Button from 'react-bootstrap/Button';

import './App.css';


const App = () => {
  const [ messages, setMessages ] = useState([]);

  const addNewNotification = (title, text, when) => {
    const newMessage = { title: title, text: text, when: when };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    setTimeout(() => {
      addNewNotification('Gamification', 'Continue to do things to progress...', '2 minutes ago');
    }, 1000)
    setTimeout(() => {
      addNewNotification('Congratulations', 'You did a thing!', '1 minute ago');
    }, 3000)
  }, []);

  const onButtonClick = () => {
    addNewNotification('New Toast', 'You just added a new toast', 'just now');
  }

  return (<Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To Gamification</h1>
      <ToastContainer position="top-end" className="p-3">
        {messages && messages.map(({title, text, when}, index) => (
          <ToastAutohideable key={index} title={title} text={text} when={when} />
        ))}
      </ToastContainer>
      <Button onClick={onButtonClick}>
        Add a New Toast
      </Button>
    </Container>
  </Container>);
};

export default App;
