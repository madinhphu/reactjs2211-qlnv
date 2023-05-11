from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import KPIType, KPIReport


class KPITypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = KPIType
        fields = '__all__'


class KPIReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = KPIReport
        fields = '__all__'
