from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.SerializerMethodField(read_only=True)
    lastName = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email',
                  'firstName', 'lastName', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_firstName(self, obj):
        firstName = obj.first_name
        if firstName == '':
            firstName = 'null'

        return firstName

    def get_lastName(self, obj):
        lastName = obj.last_name
        if lastName == '':
            lastName = 'null'

        return lastName


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email',
                  'firstName', 'lastName', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)

        return str(token.access_token)
