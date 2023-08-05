from drf_extra_fields.fields import Base64ImageField

from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    picture = Base64ImageField(allow_null=True)

    class Meta:
        model = User
        fields = '__all__'


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'username', 'password')

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
