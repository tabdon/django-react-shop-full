from rest_framework import serializers, pagination


class LinksSerializer(serializers.Serializer):
    next = pagination.NextPageField(source='*')
    prev = pagination.PreviousPageField(source='*')


class CustomPaginationSerializer(pagination.BasePaginationSerializer):
    results_field = 'objects'
    links = LinksSerializer(source='*')  # Takes the page object as the source
    total_results = serializers.ReadOnlyField(source='paginator.count')