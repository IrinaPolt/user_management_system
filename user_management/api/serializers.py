from drf_extra_fields.fields import Base64ImageField

from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    picture = Base64ImageField(allow_null=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
