from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path("logout/", views.logout_view, name="logout"),
    path('student-dashboard/', views.student_dashboard, name='student-dashboard'),
    path('organizer-dashboard/', views.organizer_dashboard, name='organizer-dashboard'),
    path("save-profile/", views.save_profile, name="save_profile"),
]
