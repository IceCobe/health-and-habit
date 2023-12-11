from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GoalViewSet, HabitViewSet, UserHabitViewSet, HabitCompletionViewSet

router = DefaultRouter()
router.register(r'goals', GoalViewSet)
router.register(r'habits', HabitViewSet)
router.register(r'userhabit', UserHabitViewSet)
router.register(r'habitcompletion', HabitCompletionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]