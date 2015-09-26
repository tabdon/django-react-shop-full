from core.models import Product
from django.shortcuts import render


def index(request):

    return render(request, 'core/index.html', {
        'products': Product.objects.all()
    })
