from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # url(r'^$', 'Quora.views.home', name='home'),
    url(r'^', include('quorahome.urls')),
    url(r'^admin/', include(admin.site.urls)),
]
