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
    class Meta:
        model = UserHabit
        fields = '__all__'

class HabitCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitCompletion
        fields = '__all__'