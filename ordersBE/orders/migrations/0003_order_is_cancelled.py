# Generated by Django 4.2.4 on 2023-12-08 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_order_new_client'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='is_cancelled',
            field=models.BooleanField(default=False),
        ),
    ]