from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User

from .serializers import UserSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
