from django.conf.urls import url
from TikoEnergy import views

app_name = 'TikoEnergy'

urlpatterns = [
    url(r'^$', views.welcome, name='welcome'),
    url(r'^graph/$', views.graph, name='graph'),
    url(r'^user-register/$', views.register, name='register'),
    url(r'^user-login/$', views.user_login, name='login'),
    url(r'^user-logout/$', views.user_logout, name='logout'),
]
