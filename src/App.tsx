import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';

function App() {
  //Update the display text from NavBar child component 
  const [displayText, setDisplayText] = useState<string>("Nothing selected");
  const updateDisplay = (text: string): void => {
    setDisplayText(text);
  }
  return (
    <div className="App">
      <header className="App-header">
        My app name
      </header>
      <div className="Main-Content">
        <Navbar updateDisplay={updateDisplay}/>
        <div className="DisplayText">{displayText}</div>
      </div>
    </div>
  );
}

export default App;
