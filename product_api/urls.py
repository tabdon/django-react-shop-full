from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'product_api.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'core.views.index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('api.urls'))
)
