from rest_framework import serializers
from leads.models import Lead

# Lead Serializer
# Taking a Python datatype and rendering it into JSON

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        # Transfering all fields within the Lead model
        fields = '__all__'
