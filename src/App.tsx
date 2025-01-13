import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Numbers from './pages/Numbers';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/numbers" element={<Numbers />} />
      </Routes>
    </Router>
  );
};

export default App;
