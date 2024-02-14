import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function GoalPage() {
  const [userHabits, setUserHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { goalId } = useParams(); // Access goalId from URL parameters

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/userhabit/?goal=${goalId}`)
      .then(response => response.json())
      .then(data => {
        setUserHabits(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [goalId]);

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
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
      }}
    >
      <Table aria-label="user habits table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Goal Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userHabits.map((userHabit) => (
            <TableRow key={userHabit.id} hover>
              <TableCell>{userHabit.goal.name}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>Update</Button>
                <Button variant="contained" color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GoalPage;
