import React from 'react';
import BasicInformation from './components/BasicInformation';
import Work from './components/Work';
import Skills from './components/Skills';
import Resources from './components/Resources';
import DeveloperSetup from './components/DeveloperSetup';

function App() {
  return (
    <div className="App">
      <BasicInformation />
      <Work />
      <Skills />
      <Resources />
      <DeveloperSetup />
    </div>
  );
}

export default App;