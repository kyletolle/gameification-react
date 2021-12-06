import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

export default function ToastAutohideable({title, text, when}) {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={7000} autohide>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
        <small>{when}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
}