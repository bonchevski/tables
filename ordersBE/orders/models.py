from django.db import models

# Create your models here.
class Order(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('card', 'Credit Card'),
        ('cash_on_delivery', 'Cash on Delivery'),
        ('invoice', 'Invoice'),
    ]
    id = models.AutoField(primary_key=True)
    client_name = models.CharField(max_length=100)
    order_number = models.CharField(max_length=100)
    order_created_date = models.DateTimeField(auto_now_add=True)
    order_delivered_date = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    order_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    new_client = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Order #{self.id}"