import React from 'react';
import './App.css';

import AppHeader from './components/AppHeader';
import BurgerContent from './components/BurgerContent';
import ModalWindow from './utils/ModalWindow/ModalWindow';




function App () {

  return (
    <div className="App">
      <AppHeader />
      <BurgerContent />
    </div>
  );
}

export default App;
