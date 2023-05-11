from django.db import models
from django.contrib.auth.models import User


# lưu trữ các chỉ số KPI báo cáo hàng ngày của nhân viên
class KPI(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    value = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_by')
    _id = models.BigAutoField(primary_key=True)


# lưu trữ các loại chỉ số KPI, ví dụ như "số lượng Tin đăng web", "số lượng Tin đăng zalo",...
class KPIType(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)
    value = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_by_kpi_type')
    _id = models.BigAutoField(primary_key=True)

    def __str__(self):
        return self.name


# cho phép trưởng phòng đặt chỉ số KPI cho nhân viên
class KPISetting(models.Model):
    kpi_type = models.ForeignKey(KPIType, on_delete=models.CASCADE)
    value = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_by_kpi_setting')
    _id = models.BigAutoField(primary_key=True)


# cho phép lưu trữ KPI hàng ngày của nhân viên
class KPISet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_by_kpi_set')
    _id = models.BigAutoField(primary_key=True)


# lưu trữ báo cáo KPI hàng ngày của nhân viên
class KPIReport(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_by_kpi_report')
    kpi = models.ForeignKey(KPIType, on_delete=models.CASCADE)
    value = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    _id = models.BigAutoField(primary_key=True)

    def __str__(self):
        return str(self.user) + ' ' + str(self.kpi) + ' ' + str(self.value)
