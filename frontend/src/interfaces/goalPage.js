import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';

const WeekdayCheckboxes = () => {
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));

  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const dates = new Array(7).fill(null).map((_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - dayOfWeek + index);
      return date;
    });
    return dates;
  };

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const dates = getWeekDates();

  return (
    <Box display="flex" justifyContent="space-around">
      {dates.map((date, index) => (
        <Box key={index} textAlign="center">
          <Typography variant="body2">
            {date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })}
          </Typography>
          <Checkbox
            checked={checkedState[index]}
            onChange={() => handleCheckboxChange(index)}
            color="primary"
          />
        </Box>
      ))}
    </Box>
  );
};

// GoalPage Component
function GoalPage() {
  const [userHabits, setUserHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { goalId } = useParams();

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
            <TableCell><Typography variant="h6">Completion</Typography></TableCell>
            <TableCell><Typography variant="h6">Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userHabits.map((userHabit) => (
            <TableRow key={userHabit.id} hover>
              <TableCell>{userHabit.goal.name}</TableCell>
              <TableCell>
                {/* Integrate WeekdayCheckboxes here */}
                <WeekdayCheckboxes />
              </TableCell>
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
