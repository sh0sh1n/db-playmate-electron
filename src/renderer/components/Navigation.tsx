import { Container, Nav, Navbar } from 'react-bootstrap';
import icon from '../../../assets/PLAY-logo.png';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={icon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="PLAY logo"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="#">Dashboard</Nav.Link>
          <Nav.Link href="#config">Config</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
