# Generated by Django 4.1.1 on 2023-04-20 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kpi', '0005_rename_createdby_kpireport_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kpireport',
            name='value',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
