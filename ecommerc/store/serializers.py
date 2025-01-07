from rest_framework import serializers
from django.http import JsonResponse
from .models import Product, ContactMessage

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

def get_products(request):
    products = Product.objects.all()
    product_list = []
    for product in products:
        product_list.append({
            'id': product.id,
            'name': product.name,
            'price': float(product.price),  # Convertir Decimal a float
            'image': product.image.url
        })
    return JsonResponse(product_list, safe=False)