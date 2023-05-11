from django.urls import path
from . import views

urlpatterns = [
    path('', views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='users-profile'),
    path('register/', views.registerUser, name='users-register'),
    path('delete/<str:pk>/', views.deleteUser, name='users-delete'),
    path('update/<str:pk>/', views.updateUser, name='users-update'),
]
