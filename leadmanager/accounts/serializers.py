from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

# Register Serializer

# ModelSerializer assists in creating a new User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {'password': {'write_only': True}}

    # Validating username, email, password. Make sure correct type of data following structure of User model
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"], validated_data["email"], validated_data["password"])

        return user

# Login Serializer
# Serializer rather than ModelSerializer because we are not creating a model


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        # Authenticating a user by checking if there is a match with the provided info in the backend
        user = authenticate(**data)
        # authenticate is a Boolean factor that determines whether the user is active.
        if user and user.is_active:
            return user
        # Sending an error to the user
        raise serializers.ValidationError("Incorrect Credentials")
