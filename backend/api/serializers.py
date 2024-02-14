from rest_framework import serializers
from .models import Goal, Habit, UserHabit, HabitCompletion

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = '__all__'

class UserHabitSerializer(serializers.ModelSerializer):
    goal = GoalSerializer(read_only=True)
    habit = HabitSerializer(read_only=True)

    class Meta:
        model = UserHabit
        fields = ['id', 'user', 'goal', 'habit']

class HabitCompletionSerializer(serializers.ModelSerializer):
    user_habit = UserHabitSerializer(read_only=True)

    class Meta:
        model = HabitCompletion
        fields = '__all__'
