import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HowToPlay from './components/HowToPlay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/howto" element={<HowToPlay />} />
    </Routes>
  );
};

export default App;