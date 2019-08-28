from django.shortcuts import render

# Create your views here.

# Requesting html templates to be rendered


def index(request):
    # Rendering templates/frontend/index.html
    return render(request, 'frontend/index.html')
