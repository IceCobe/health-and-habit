import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';

const WeekdayCheckboxes = ({ userHabitId, habitCompletions }) => {
    const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  
    useEffect(() => {
      if (habitCompletions) {
        const updatedCheckedState = new Array(7).fill(false);
        habitCompletions.forEach(completion => {
          const date = new Date(completion.date);
          const index = date.getDay();
          updatedCheckedState[index] = completion.completed;
        });
        setCheckedState(updatedCheckedState);
      }
    }, [habitCompletions]);
  
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
  
    const updateHabitCompletion = async (position, completed) => {
      const date = getWeekDates()[position].toISOString().split('T')[0];
      const requestBody = {
        user_habit: userHabitId,
        date: date,
        completed: completed,
      };
  
      console.log("Sending POST request to /api/habitcompletions/upsert/", requestBody); // Log request body
  
      try {
        const response = await fetch('http://localhost:8000/api/habitcompletionsupsert/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Habit completion updated:', data);
      } catch (error) {
        console.error('Error updating habit completion:', error);
      }
    };
  
    const handleCheckboxChange = (position) => {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
  
      setCheckedState(updatedCheckedState);
      updateHabitCompletion(position, !checkedState[position]); // Call API with new completion status
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
      fetch(`http://localhost:8000/api/userhabits/?goal=${goalId}`)
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
  
    useEffect(() => {
      if (userHabits.length > 0) {
        fetchHabitCompletions();
      }
    }, [userHabits]);
  
    const fetchHabitCompletions = async () => {
      try {
        const habitCompletionPromises = userHabits.map(userHabit => {
          return fetch(`http://localhost:8000/api/habitcompletions/?user_habit=${userHabit.id}`)
            .then(response => response.json());
        });
        const habitCompletionResponses = await Promise.all(habitCompletionPromises);
        const updatedUserHabits = userHabits.map((userHabit, index) => {
          return {
            ...userHabit,
            completions: habitCompletionResponses[index],
          };
        });
        setUserHabits(updatedUserHabits);
      } catch (error) {
        console.error('Error fetching habit completions:', error);
      }
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
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
        }}
      >
        <Table aria-label="user habits table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Habit Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Completion</Typography></TableCell>
              <TableCell><Typography variant="h6">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userHabits.map((userHabit) => (
              <TableRow key={userHabit.id} hover>
                <TableCell>{userHabit.habit.name}</TableCell>
                <TableCell>
                  {userHabit.completions && (
                    <WeekdayCheckboxes
                      userHabitId={userHabit.id}
                      habitCompletions={userHabit.completions}
                    />
                  )}
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
