"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import apply_job, get_user_info, hello_api, job_detail, job_list, login_user, logout_user, register_user, user_applications

urlpatterns = [
    path('admin/', admin.site.urls),
    path("hello/", hello_api),
    path("register/", register_user),
    path("login/", login_user),
    path("logout/", logout_user),
    path("user/", get_user_info),
    path("jobs/", job_list),
    path("jobs/<int:job_id>/", job_detail),
    path("apply/", apply_job),
    path("applications/<int:user_id>/", user_applications),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)