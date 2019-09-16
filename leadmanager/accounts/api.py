from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer

# POST REQUEST: Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # Requesting for passed data through get_serializer
        serializer = self.get_serializer(data=request.data)
        # Send back errors if any
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            # The Token.objects.create returns a tuple (instance, token). So in order to get token use the index 1
            "token": AuthToken.objects.create(user)[1]
        })
        # Response will return
        # {
        #     "user": {
        #         "id": 3,
        #         "username": "Jay",
        #         "email": "Jay@gmail.com"
        #     },
        #     "token": "fd6970047b6bc1a969b7fca4cc0f8accd307e1a30a616064e9ae5b9c2453f431"
        # }

# POST REQUEST: Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# GET REQUEST: Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
