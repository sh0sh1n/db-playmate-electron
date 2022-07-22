import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import { store } from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Container className="row">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}
