from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .models import KPIType, KPIReport
from .serializers import KPITypeSerializer, KPIReportSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getKpiTypes(request):
    kpiType = KPIType.objects.all()
    serializer = KPITypeSerializer(kpiType, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createKpiType(request):
    try:
        user = request.user
        data = request.data
        kpiType = KPIType.objects.create(
            name=data['name'],
            value=data['value'],
            description=data['description'],
            createdBy=user,
        )

        serializer = KPITypeSerializer(kpiType, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'KPI đã tồn tại'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateKpiType(request, pk):
    data = request.data
    kpiType = KPIType.objects.get(_id=pk)

    kpiType.name = data['name']
    kpiType.value = data['value']
    kpiType.description = data['description']

    kpiType.save()

    serializer = KPITypeSerializer(kpiType, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteKpiType(request, pk):
    kpiType = KPIType.objects.get(_id=pk)
    kpiType.delete()
    return Response('KPI đã xóa thành công')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReportKpi(request):
    reportKpi = KPIReport.objects.all()
    serializer = KPIReportSerializer(reportKpi, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createKpiReport(request):
    try:
        user = request.user
        data = request.data

        for i in data:
            reportKpi = KPIReport.objects.create(
                user=user,
                kpi=KPIType.objects.get(_id=i['id']),
                value=i['value'],
            )

        serializer = KPIReportSerializer(reportKpi, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'KPI đã tồn tại'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
