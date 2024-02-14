import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GoalSelectionTable() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/api/goals/')
      .then(response => response.json())
      .then(data => {
        setGoals(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSelectGoal = (id) => {
    navigate(`/goal/${id}`); // Navigate to the goal page
  };

  const handleEditGoalName = (id) => {
    console.log(`Editing goal name with ID: ${id}`);
    // Implement the editing logic here, such as opening a dialog
  };

  const handleDeleteGoal = (id) => {
    console.log(`Deleting goal with ID: ${id}`);
    // Implement the deletion logic here, such as showing a confirmation dialog
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{
        margin: 'auto',
        marginTop: 2,
        maxWidth: '80%',
        padding: 2,
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}
    >
      <Table aria-label="goals table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Goal Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Status</Typography></TableCell>
            <TableCell><Typography variant="h6">Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id} hover>
              <TableCell>{goal.name}</TableCell>
              <TableCell>
                {/* Boxes for each status timeframe */}
                <Box sx={{ marginBottom: '8px', padding: '4px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  X/Y days this week
                </Box>
                <Box sx={{ marginBottom: '8px', padding: '4px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  X/Y days this month
                </Box>
                <Box sx={{ padding: '4px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  X/Y days this 12 Week Year
                </Box>
              </TableCell>
              <TableCell>
                {/* Action Buttons */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleSelectGoal(goal.id)}
                  sx={{ marginRight: 1 }}
                >
                  Select Goal
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleEditGoalName(goal.id)}
                  sx={{ marginRight: 1 }}
                >
                  Edit Goal Name
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  Delete Goal
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GoalSelectionTable;
