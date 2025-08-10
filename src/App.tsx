// src/App.tsx
import React, { useState } from 'react';
import Portfolio from './components/Portfolio';
import SiteGate from './components/SiteGate';
import './index.css';

const App: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    setIsVerified(true);
  };

  return (
    <div className="App">
      {!isVerified && <SiteGate onVerified={handleVerification} />}
      {isVerified && <Portfolio />}
    </div>
  );
};

export default App;