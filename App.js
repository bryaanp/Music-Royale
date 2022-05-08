//Libraries to be Installed:
//npm install axios react-router-dom (allows Dynamic Routing in App and API Routing)
//npm install @mui/material @emotion/react @emotion/styled (Handles UI of Quiz)
//npm install firebase (allows firebase connectivity to app)

import React from 'react'
import './App.css';
import Quiz from './Quiz';
import PlayQuiz from './PlayQuiz';
import Results from './Result';
import {
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <div className='app-main'>
      <Routes>
        <Route exact path='/' element={<Quiz />} />
        <Route exact path='/play' element={<PlayQuiz />} />
        <Route exact path='/results' element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
