from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Goal, Habit, UserHabit, HabitCompletion
from .serializers import GoalSerializer, HabitSerializer, UserHabitSerializer, HabitCompletionSerializer

# Your existing viewsets
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

class HabitCompletionUpsertView(APIView):
    def post(self, request, *args, **kwargs):
        user_habit_id = request.data.get('user_habit')
        date = request.data.get('date')
        completed = request.data.get('completed', False)
        
        user_habit = get_object_or_404(UserHabit, id=user_habit_id)

        habit_completion, created = HabitCompletion.objects.update_or_create(
            user_habit=user_habit,
            date=date,
            defaults={'completed': completed}
        )

        serializer = HabitCompletionSerializer(habit_completion)
        response_status = status.HTTP_200_OK if not created else status.HTTP_201_CREATED
        return Response(serializer.data, status=response_status)
