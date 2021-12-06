import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import ToastContainer from 'react-bootstrap/ToastContainer';
import ToastAutohideable from './ToastAutohideable';
import Form from 'react-bootstrap/Form';

import './App.css';


const App = () => {
  const DEFAULT_SWITCHES = [
    {switchId: "switch-1", label: "Click this first.", checked: false},
    {switchId: "switch-2", label: "Click this second..", checked: false},
    {switchId: "switch-3", label: "Click this third...", checked: false},
  ]
  const [ messages, setMessages ] = useState([]);
  const [switches, setSwitches] = useState([...DEFAULT_SWITCHES]);
  const [allSwitchesCheckedAchievementEarned, setAllSwitchesCheckedAchievementEarned] = useState(false);

  const addNewNotifications = (messagesToAdd) => {
    setMessages([...messages, ...messagesToAdd]);
  };

  const allSwitchesCheckedAchievement = () => {
    if (allSwitchesCheckedAchievementEarned) { return; }
    const checkedValues = switches.map(({checked}) => (checked));
    const areAllChecked = checkedValues.every(toggle => (toggle === true));
    if (areAllChecked) {
      addNewNotifications([{
        title: "Achievement Unlocked!", text: "Congratulations, you've checked all the switches!", when: 'just now'
      }]);
      setAllSwitchesCheckedAchievementEarned(true);
    }
  }

  useEffect(allSwitchesCheckedAchievement, [switches])

  useEffect(() => {
    addNewNotifications([
      {title: 'Gamification', text: 'Complete some activities on the page to unlock some badges!', when: 'just now'},
    ]);
  }, []);

  const onSwitchChange = (event) => {
    // console.log('event', event);
    // console.log('target.id', event.target.id);
    const switchIdToFind = event.target.id;
    console.log('switchIdToFind', switchIdToFind);
    const switchIndex = switches.findIndex((toggle) => (toggle.switchId === switchIdToFind));
    if (switchIndex === -1) { return; } // Didn't find anything

    const newSwitches = [...switches];
    const isChecked = event.target.checked;
    const oldSwitch = switches[switchIndex];
    console.log('isChecked?', isChecked);
    newSwitches[switchIndex] = {...oldSwitch, checked: isChecked};
    setSwitches(newSwitches);
  }

  return (<Container className="p-3">
  <ToastContainer position="top-end" className="p-3">
    {messages && messages.map(({title, text, when}, index) => (
      <ToastAutohideable key={index} title={title} text={text} when={when} />
    ))}
  </ToastContainer>
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To Gamification</h1>
      <p>Complete some activities on the page to unlock some badges!</p>
      {/* <Button onClick={onButtonClick}>
        Add a New Toast
      </Button> */}
      <Form>
        {switches.map(({switchId, label, checked}, index) => (
          <Form.Switch
            key={index}
            id={switchId}
            label={label}
            checked={checked}
            onChange={onSwitchChange}
            disabled={allSwitchesCheckedAchievementEarned}
          />
        ))}
      </Form>
    </Container>
  </Container>);
};

export default App;
