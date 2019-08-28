from django.urls import path
from . import views

#  Creating a url path and linking it with our views.index (leadmanager/src/index.js)
urlpatterns = [
    path('', views.index)
]
