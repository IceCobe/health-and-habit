import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoalSelectionTable from './GoalSelectionTable'; // Adjust the import path as necessary
import HabitSelection from './HabitSelection'; // Adjust the import path as necessary and ensure you have this component created

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoalSelectionTable />} />
        <Route path="/habitSelection" element={<HabitSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
