from django.urls import path, include
from .views import HabitCompletionUpsertView, GoalViewSet, HabitViewSet, UserHabitViewSet, HabitCompletionViewSet
from rest_framework.routers import DefaultRouter

# Assuming you're using a router for viewsets
router = DefaultRouter()
router.register(r'goals', GoalViewSet)
router.register(r'habits', HabitViewSet)
router.register(r'userhabits', UserHabitViewSet)
router.register(r'habitcompletions', HabitCompletionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('habitcompletionsupsert/', HabitCompletionUpsertView.as_view(), name='habitcompletion-upsert'),
]