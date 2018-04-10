"""
Definition of urls for ExpertSystem.
"""

from datetime import datetime
from app.views import Addvolcano
from app.views import Addgroupvolcano
from django.conf.urls import url
import django.contrib.auth.views

import app.forms
import app.views

# Uncomment the next lines to enable the admin:
# from django.conf.urls import include
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    # Examples:
    url(r'^$', app.views.home, name='home'),
    url(r'^maps$', app.views.maps, name='Maps'),
    url(r'^signs$', app.views.signs, name='Signs'),
    url(r'^filldb$', app.views.fillDB, name='filldb'),
    url(r'^contact$', app.views.contact, name='contact'),
    url(r'^get_info_volcano/$', app.views.getInfoVolcano, name='get_info_volcano'),
    url(r'^onegraph/$', app.views.onegraph, name='onegraph'),
    url(r'^about', app.views.about, name='about'),
    url(r'^addsign', app.views.Addsign.as_view(), name='addsign'),
    url(r'^addvalue',app.views.Addvalue.as_view(), name='addvalue'),
    url(r'^addgroupvolcano',app.views.Addgroupvolcano.as_view(), name='addgroupvolcano'),
    url(r'^addvolcano',app.views.Addvolcano.as_view(), name='addvolcano'),
    url(r'^selectvolcano/$',app.views.SelectVolcano.as_view(), name='selectvolcano'),
    url(r'^updatevolcano/(?P<pk>\d+)/$',app.views.VolcanoUpdate.as_view(), name='updatevolcano'),
    url(r'^login/$',
        django.contrib.auth.views.login,
        {
            'template_name': 'app/login.html',
            'authentication_form': app.forms.BootstrapAuthenticationForm,
            'extra_context':
            {
                'title': 'Log in',
                'year': datetime.now().year,
            }
        },
        name='login'),
    url(r'^logout$',
        django.contrib.auth.views.logout,
        {
            'next_page': '/',
        },
        name='logout'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
]
