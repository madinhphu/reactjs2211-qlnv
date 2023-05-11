from django.urls import path
from . import views

urlpatterns = [
    # path('', views.getUsers, name='users'),
    # path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('profile/', views.getUserProfile, name='users-profile'),
    path('list-kpi-type/', views.getKpiTypes, name='get_kpiType'),
    path('create-kpi-type/', views.createKpiType, name='create_kpiType'),
    path('update-kpi-type/<str:pk>/',
         views.updateKpiType, name='update_kpiType'),
    path('delete-kpi-type/<str:pk>/',
         views.deleteKpiType, name='delete_kpiType'),

    path('create-report-kpi/',
         views.createKpiReport, name='create_report_kpi'),
    path('get-report-kpi/',
         views.getReportKpi, name='get_report_kpi'),
]
