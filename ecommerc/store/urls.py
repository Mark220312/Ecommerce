from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ContactMessageViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'messages', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
