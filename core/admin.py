from django.contrib import admin

from .models import Product, Order, Review


admin.site.register(Product)
admin.site.register(Order)
# noinspection PyInterpreter
admin.site.register(Review)