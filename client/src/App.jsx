import { useState } from 'react';
import { useTrackVisit } from './hooks/useTrackVisit';
import HeartIntro from './components/HeartIntro/HeartIntro';
import EnvelopeCard from './components/EnvelopeCard/EnvelopeCard';
import FinalScreen from './components/FinalScreen/FinalScreen';
import styles from './App.module.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro'); // intro | envelope | final
  
  // Track visit khi app load
  useTrackVisit();
  
  // Handler khi intro hoàn thành
  const handleIntroComplete = () => {
    setCurrentScreen('envelope');
  };
  
  // Handler khi đóng envelope
  const handleEnvelopeNext = () => {
    setCurrentScreen('final');
  };
  
  return (
    <div className={styles.app}>
      {currentScreen === 'intro' && (
        <HeartIntro onComplete={handleIntroComplete} />
      )}
      
      {currentScreen === 'envelope' && (
        <EnvelopeCard onNext={handleEnvelopeNext} />
      )}
      
      {currentScreen === 'final' && (
        <FinalScreen />
      )}
    </div>
  );
}

export default App;