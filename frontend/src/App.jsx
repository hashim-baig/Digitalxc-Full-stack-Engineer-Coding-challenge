// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SecretSanta from './components/SecretSanta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SecretSanta />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;