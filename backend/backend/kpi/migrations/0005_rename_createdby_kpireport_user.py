# Generated by Django 4.1.1 on 2023-04-20 07:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kpi', '0004_remove_kpireport_kpi_set'),
    ]

    operations = [
        migrations.RenameField(
            model_name='kpireport',
            old_name='createdBy',
            new_name='user',
        ),
    ]
