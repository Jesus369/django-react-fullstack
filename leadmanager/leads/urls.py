from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
# Identifying a route, passing in our LeadViewSet into the route, and referencing
# LeadViewSet as leads
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls
