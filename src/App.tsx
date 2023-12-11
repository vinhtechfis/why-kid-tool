import React from 'react';

import './App.css';
import CanvasDrawer from './components/canvas_drawer';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <CanvasDrawer />
      </header>
    </div>
  );
}

export default App;
