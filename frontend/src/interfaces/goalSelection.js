import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function GoalSelectionTable() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/goals/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setGoals(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="goals table">
        <TableHead>
          <TableRow>
            <TableCell>Goal ID</TableCell>
            <TableCell>Goal Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>{goal.id}</TableCell>
              <TableCell>{goal.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GoalSelectionTable;