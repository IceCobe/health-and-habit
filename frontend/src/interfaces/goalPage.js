import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function GoalPage() {
  const [userHabits, setUserHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { goalId } = useParams(); // Access goalId from URL parameters

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/userhabit/?goal=${goalId}`) // Adjust URL as needed
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
    <TableContainer component={Paper}>
      <Table aria-label="user habits table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Habit Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Goal Name</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userHabits.map((userHabit) => (
            <TableRow key={userHabit.id} hover>
              <TableCell>{userHabit.habit.name}</TableCell>
              <TableCell>{userHabit.goal.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GoalPage;
