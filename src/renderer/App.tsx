import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Configuration from './components/Configuration';
import Dashboard from './components/Dashboard';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Container className="my-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/config" element={<Configuration />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}
