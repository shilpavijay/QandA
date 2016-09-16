from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^', include('quorahome.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url('', include('social.apps.django_app.urls', namespace='social')),
]
