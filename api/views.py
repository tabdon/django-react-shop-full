from core.models import Product, Order, Review
from rest_framework import viewsets
from api import serializers


class DynamicSerializerViewSet(viewsets.ModelViewSet):
    serializer_classes = {}

    def get_serializer_class(self):
        assert self.serializer_classes.get(self.action) or self.serializer_classes.get('default') is not None, (
            "'%s' should either specify a key for '%s' in a `serializer_classes` attribute, "
            "or set the 'default' key."
            % (self.__class__.__name__, self.action)
        )

        return self.serializer_classes.get(self.action) or self.serializer_classes.get('default')


class ProductViewSet(DynamicSerializerViewSet):
    """
    API endpoint that allows products to be viewed or created.
    """
    queryset = Product.objects.all()
    paginate_by = 2

    serializer_classes = {
        'default': serializers.ProductSerializer,
        'list': serializers.ProductListSerializer
    }


class ProductReviewViewSet(viewsets.ModelViewSet):
    paginate_by = 10
    serializer_class = serializers.ReviewSerializer

    def get_queryset(self):
        return Product.objects.get(**self.kwargs).review_set.all().order_by('-id')


class OrderViewSet(DynamicSerializerViewSet):
    """
    API endpoint that allows orders to be viewed or created.
    """
    queryset = Order.objects.all()
    paginate_by = 10

    serializer_classes = {
        'default': serializers.OrderSerializer,
        'list': serializers.OrderListSerializer
    }

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.OrderPostSerializer

        return super(OrderViewSet, self).get_serializer_class()


class ReviewViewSet(DynamicSerializerViewSet):
    """
    API endpoint that allows orders to be viewed or created.
    """
    queryset = Review.objects.all()
    paginate_by = 10

    serializer_classes = {
        'default': serializers.ReviewSerializer,
        'list': serializers.ReviewListSerializer
    }

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.ReviewPostSerializer

        return super(ReviewViewSet, self).get_serializer_class()
