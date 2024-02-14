import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoalSelectionTable from './interfaces/goalSelection';
import GoalPage from './interfaces/goalPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GoalSelectionTable />} />
          <Route path="/goal/:goalId" element={<GoalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
