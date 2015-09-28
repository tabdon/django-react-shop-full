from core.models import Product
from django.shortcuts import render
from django.conf import settings


def index(request):
    if not settings.STRIPE_SECRET_KEY or not settings.STRIPE_PUBLISHABLE_KEY:
        raise Exception('STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY in product-api.settings.py are empty')

    return render(request, 'core/index.html', {
        'stripe_publishable_key': settings.STRIPE_PUBLISHABLE_KEY,
        'products': Product.objects.all()
    })
