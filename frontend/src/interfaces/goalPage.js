import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';

const WeekdayCheckboxes = ({ userHabitId, habitCompletions }) => {
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));

  useEffect(() => {
    const updatedCheckedState = new Array(7).fill(false);
    habitCompletions?.forEach(completion => {
      const date = new Date(completion.date);
      updatedCheckedState[date.getDay()] = completion.completed;
    });
    setCheckedState(updatedCheckedState);
  }, [habitCompletions]);

  const getWeekDates = () => {
    const now = new Date();
    return [...Array(7)].map((_, i) => new Date(now.setDate(now.getDate() - now.getDay() + i)));
  };

  const updateHabitCompletion = async (position, completed) => {
    const date = getWeekDates()[position].toISOString().split('T')[0];
    const requestBody = { user_habit: userHabitId, date, completed };

    try {
      const response = await fetch('http://localhost:8000/api/habitcompletions-upsert/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
      console.log('Habit completion updated:', await response.json());
    } catch (error) {
      console.error('Error updating habit completion:', error);
    }
  };

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
    setCheckedState(updatedCheckedState);
    updateHabitCompletion(position, !checkedState[position]);
  };
  /*
    Me:
      Why don't I just reread the contents and update it, that way I don't have to pass a position in

    Django and React Full Stack Expert:
      Opting to directly read the current state of the checkboxes from the UI and update the component state accordingly, instead of using the position parameter to track changes, is a valid approach in some scenarios. However, it has its trade-offs. Here's a comparison to give you a clearer picture:

      Using the position Parameter
        Pros:
        - Performance: Directly manipulating the state based on the position parameter can be more performant since it avoids querying the DOM to get the current state of the checkboxes.
        - React Principles: More in line with React's data-driven approach, where the UI is a reflection of the state. You keep your source of truth in the component's state rather than the DOM, leading to more predictable and manageable code.
        - Simplicity: Updating based on position makes the function easier to understand and maintain, as it directly maps user actions to state changes without the need for additional logic to read the UI.

        Cons:
        - Requires Index: You need to know the index (position) of the checkbox, which requires a bit more setup when rendering the checkboxes (e.g., passing the index to the onChange handler).

      Rereading Contents and Updating
        Pros:
        - No Index Required: This approach doesn't require passing an index or position, which might simplify the component rendering logic.

        Cons:
        - Performance: Accessing the DOM to read the current state of checkboxes can be less performant, especially as the number of checkboxes grows.
        - Complexity: Your logic might become more complex and less predictable, as you're relying on the UI state, which can be manipulated in ways not accounted for in your component's logic.
        - React Principles: It goes against React's principle of keeping the UI as a reflection of the state. In React, it's generally recommended to avoid direct DOM manipulations and rely on state and props to manage the UI.

      TLDR: While directly reading from and updating the UI without using position might seem simpler in some aspects, it can lead to performance issues, complexity, and goes against the React principle of state-driven UI. The position-based approach ensures that your component state is the single source of truth, leading to cleaner, more maintainable, and predictable code.
  */
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

function GoalPage() {
  const [userHabits, setUserHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { goalId } = useParams();

  useEffect(() => {
    const fetchHabits = async () => {
      setIsLoading(true);
      try {
        const habitsResponse = await fetch(`http://localhost:8000/api/userhabits/?goal_id=${goalId}`);
        const habitsData = await habitsResponse.json();
        const habitsWithCompletions = await Promise.all(habitsData.map(async habit => {
          const completionsResponse = await fetch(`http://localhost:8000/api/habitcompletions/?user_habit=${habit.id}`);
          habit.completions = await completionsResponse.json();
          return habit;
        }));
        setUserHabits(habitsWithCompletions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHabits();
  }, [goalId]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 2, maxWidth: '80%', padding: 2, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
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
                <WeekdayCheckboxes userHabitId={userHabit.id} habitCompletions={userHabit.completions} />
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