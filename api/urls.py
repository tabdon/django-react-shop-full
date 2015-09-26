from django.conf.urls import url, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'product', views.ProductViewSet)

product_list = views.ProductViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

product_detail = views.ProductViewSet.as_view({
    'get': 'retrieve'
})

product_review = views.ProductReviewViewSet.as_view({
    'get': 'list',
})

order_list = views.OrderViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

order_detail = views.OrderViewSet.as_view({
    'get': 'retrieve'
})

review_list = views.ReviewViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

review_detail = views.ReviewViewSet.as_view({
    'get': 'retrieve'
})


urlpatterns = [
    url(r'product/$', product_list, name='product-list'),
    url(r'product/(?P<pk>[0-9]+)/$', product_detail, name='product-detail'),
    url(r'product/(?P<pk>[0-9]+)/reviews/$', product_review, name='product-reviews'),
    url(r'order/$', order_list, name='order-list'),
    url(r'order/(?P<pk>[0-9]+)/$', order_detail, name='order-detail'),
    url(r'review/$', review_list, name='review-list'),
    url(r'review/(?P<pk>[0-9]+)/$', review_detail, name='review-detail'),
]