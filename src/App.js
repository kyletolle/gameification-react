import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import ToastContainer from 'react-bootstrap/ToastContainer';
import ToastAutohideable from './ToastAutohideable';
import Button from 'react-bootstrap/Button';

import './App.css';


const App = () => {
  const [ messages, setMessages ] = useState([]);

  const addNewNotifications = (messagesToAdd) => {
    setMessages([...messages, ...messagesToAdd]);
  };

  useEffect(() => {
    addNewNotifications([
      {title: 'Gamification', text: 'Complete some activities on the page to unlock some badges!', when: 'just now'},
    ]);
  }, []);

  const onButtonClick = () => {
    addNewNotifications([ { title: 'New Toast', text: 'You just added a new toast', when: 'just now'}]);
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
