from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
# viewsets creates CRUD API. For viewing and editing instances


class LeadViewSet(viewsets.ModelViewSet):

    permission_classes = [
        # Rendering Leads only if Authenticated
        permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer

    # Returning the leads of the Authenticated User
    def get_queryset(self):
        return self.request.user.leads.all()

    # Saving a new object instance
    def perform_create(self, serializer):
        # Setting the owner field = to the new user
        serializer.save(owner=self.request.user)
