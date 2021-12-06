import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import ToastAutohideable from './ToastAutohideable';
import ToastContainer from 'react-bootstrap/ToastContainer';

import './App.css';

const App = () => {
  const DEFAULT_SWITCHES = [
    { switchId: "switch-1", label: "Check this first.", checked: false },
    { switchId: "switch-2", label: "Check this second..", checked: false },
    { switchId: "switch-3", label: "Check this third...", checked: false },
  ];
  const DEFAULT_BUTTONS = [
    { buttonId: 'button-1', text: 'Click this first.', disabled: false },
    { buttonId: 'button-2', text: 'Click this second..', disabled: false },
    { buttonId: 'button-3', text: 'Click this third...', disabled: false },

  ]
  const TOTAL_ACHIEVEMENTS = 2;

  const [ messages, setMessages ] = useState([]);
  const [switches, setSwitches] = useState([...DEFAULT_SWITCHES]);
  const [allSwitchesCheckedAchievementEarned, setAllSwitchesCheckedAchievementEarned] = useState(false);
  const [buttons, setButtons] = useState([...DEFAULT_BUTTONS]);
  const [allButtonsClickedAchievementEarned, setAllButtonsClickedAchievementEarned] = useState(false);
  const [completedAchievements, setCompletedAchievements] = useState(0);
  const [progress, setProgress] = useState(0);

  const addNewNotifications = (messagesToAdd) => {
    setMessages([...messages, ...messagesToAdd]);
  };

  const seeIfAllSwitchesCheckedAchievementEarned = () => {
    if (allSwitchesCheckedAchievementEarned) { return; }
    const checkedValues = switches.map(({checked}) => (checked));
    const areAllChecked = checkedValues.every(toggle => (toggle === true));
    if (!areAllChecked) { return; }

    addNewNotifications([{
      title: "Achievement Unlocked!", text: "Congratulations, you've checked all the switches!", when: 'just now'
    }]);
    setAllSwitchesCheckedAchievementEarned(true);
  };
  useEffect(seeIfAllSwitchesCheckedAchievementEarned, [switches])

  useEffect(() => {
    addNewNotifications([
      {title: 'Gamification', text: 'Complete some activities on the page to unlock some badges!', when: 'just now'},
    ]);
  }, []);

  const onSwitchChange = (event) => {
    // console.log('event', event);
    // console.log('target.id', event.target.id);
    const switchIdToFind = event.target.id;
    const switchIndex = switches.findIndex((toggle) => (toggle.switchId === switchIdToFind));
    if (switchIndex === -1) { return; } // Didn't find anything

    const newSwitches = [...switches];
    const isChecked = event.target.checked;
    const oldSwitch = switches[switchIndex];
    newSwitches[switchIndex] = {...oldSwitch, checked: isChecked};
    setSwitches(newSwitches);

    addNewNotifications([
      {title: 'Nice check', text: 'You checked a toggle switch... Keep going!', when: 'just now'},
    ]);
  };

  const onButtonClick = (event) => {
    console.info('Clicked on a button');
    const buttonIdToFind = event.target.id;
    const buttonIndex = buttons.findIndex((button) => (button.buttonId === buttonIdToFind));
    if (buttonIndex === -1) { return; } // Didn't find anything

    const newButtons = [...buttons];
    const oldButton = buttons[buttonIndex];
    newButtons[buttonIndex] = {...oldButton, disabled: true};
    setButtons(newButtons);

    addNewNotifications([
      {title: 'Nice click', text: 'You clicked a button... Keep going!', when: 'just now'},
    ]);
  }

  const seeIfAllButtonsClickedAchievementEarned = () => {
    if (allButtonsClickedAchievementEarned) { return; }

    const clickedValues = buttons.map(({disabled}) => (disabled));

    const areAllClicked = clickedValues.every(clicked => (clicked === true));
    if (!areAllClicked) { return; }

    addNewNotifications([{
      title: "Achievement Unlocked!", text: "Congratulations, you've clicked all the buttons!", when: 'just now'
    }]);
    setAllButtonsClickedAchievementEarned(true);
  };
  useEffect(seeIfAllButtonsClickedAchievementEarned, [buttons]);

  // Figure out how many achievements have been earned
  useEffect(() => {
    const newCompletedAchievements = [allSwitchesCheckedAchievementEarned, allButtonsClickedAchievementEarned].reduce((total, bool) => total + (bool ? 1 : 0), 0);
    setCompletedAchievements(newCompletedAchievements);
  }, [allSwitchesCheckedAchievementEarned, allButtonsClickedAchievementEarned])

  // Figure out much progress has been made on the achievements
  useEffect(() => {
    const newProgress = (completedAchievements / TOTAL_ACHIEVEMENTS) * 100;
    setProgress(newProgress);
  }, [completedAchievements]);

  return (
    <Container className="p-0">
      <Container className="shadow p-4 mt-3 mb-3 bg-primary text-light rounded-3">
        <h1 className="header">Welcome To Gamification</h1>
        <p>Complete some activities on the page to unlock some badges!</p>
      </Container>

      <Container className="p-0 mb-3">
        <Row>
          <Col>
            <Container className={`shadow p-3 ${allSwitchesCheckedAchievementEarned ? 'bg-success' : 'bg-info'} text-light rounded-3`}>
              <h2 className="border-bottom border-light mb-4">Check some switches</h2>
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
          </Col>
          <Col>
            <Container className={`shadow p-3 ${allButtonsClickedAchievementEarned ? 'bg-success' : 'bg-info'} text-light rounded-3`}>
              <h2 className="border-bottom border-light mb-4">Click some buttons</h2>
              <div className="d-grid gap-2">
                {buttons.map(({buttonId, text, disabled}, index) => (
                  <Button
                    variant={disabled ? 'secondary' : 'primary'}
                    key={index}
                    id={buttonId}
                    onClick={onButtonClick}
                    disabled={disabled}
                    className="shadow"
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container className="p-0 mb-3">
        <Row>
          <Col>
            <Container className="shadow p-3 bg-light rounded-3">
              <h2 className="border-bottom border-secondary mb-4">Badges Earned</h2>
              These are all the badges you've earned!
            </Container>
          </Col>
          <Col>
            <Container className="shadow p-3 bg-light rounded-3">
              <h2 className="border-bottom border-secondary mb-4">Progress</h2>
              You've completed {completedAchievements} of {TOTAL_ACHIEVEMENTS} achievements.
              <ProgressBar animated now={progress} className='my-3' />
              </Container>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-end" className="p-3">
        {messages && messages.map(({title, text, when}, index) => (
          <ToastAutohideable key={index} title={title} text={text} when={when} />
        ))}
      </ToastContainer>
    </Container>
  );
};

export default App;
