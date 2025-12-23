import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HowToPlay from './components/HowToPlay';
import PlayScreen from './components/play/PlayScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/howto" element={<HowToPlay />} />
      <Route path="/play" element={<PlayScreen />} />
    </Routes>
  );
};

export default App;