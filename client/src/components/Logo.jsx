import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
export default function Logo() {
  return (<>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
            <img src="/logo.png"/>
        </Navbar.Brand>
      </Container>
    </Navbar>
    </>
  );
}
