# Generated by Django 4.2.4 on 2023-12-08 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='new_client',
            field=models.BooleanField(default=False),
        ),
    ]
