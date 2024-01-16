import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function GoalSelectionTable() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Replace with your actual API URL
    fetch('http://localhost:8000/api/goals/')
      .then(response => response.json())
      .then(data => setGoals(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <TableContainer 
      component={Paper} 
      sx={{
        margin: 'auto', // Centers the table
        marginTop: 2, // Adds margin to the top (using theme spacing)
        maxWidth: '80%', // Limits the width of the table
        padding: 2, // Adds padding inside the container (using theme spacing)
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Box shadow for styling
      }}
    >
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
