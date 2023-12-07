from django.contrib import admin
from .models import Goal, Habit, UserHabit, HabitCompletion


admin.site.register(Goal)
admin.site.register(Habit)
admin.site.register(UserHabit)
admin.site.register(HabitCompletion)