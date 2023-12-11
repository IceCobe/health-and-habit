from rest_framework import viewsets
from .models import Goal, Habit, UserHabit, HabitCompletion
from .serializers import GoalSerializer, HabitSerializer, UserHabitSerializer, HabitCompletionSerializer

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class UserHabitViewSet(viewsets.ModelViewSet):
    queryset = UserHabit.objects.all()
    serializer_class = UserHabitSerializer

class HabitCompletionViewSet(viewsets.ModelViewSet):
    queryset = HabitCompletion.objects.all()
    serializer_class = HabitCompletionSerializer