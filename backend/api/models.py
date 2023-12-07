from django.db import models
from django.conf import settings

class Goal(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Habit(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class UserHabit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.goal.name} - {self.habit.name}"


class HabitCompletion(models.Model):
    user_habit = models.ForeignKey(UserHabit, on_delete=models.CASCADE, related_name='completions')
    date = models.DateField()
    completed = models.BooleanField(default=False)

    class Meta:
        # This makes 'user_habit' & 'date' have to be unique
        unique_together = ('user_habit', 'date')

    def __str__(self):
        return f"{self.user_habit} - {self.date} - Completed: {self.completed}"
