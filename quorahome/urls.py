from django.conf.urls import url
from django.contrib.auth import views as auth_views
from quorahome.views import *


urlpatterns = [
	url(r'^$', ulogin), 			#renders and validates login
	url(r'^main/$',mainpg),
	url(r'^answer/$',answer),
	# url(r'^content/$',content),
	url(r'^ans_count/',anspg_count),
	url(r'^feed/$',feed), 			#feed details - main page
	url(r'^users/folusers/$', foll_users),#used for following other users (admin purpose) 
	url(r'^users/$', user_list), 	#renders page - list of users to follow
	
	# url(r'^logout/$', logout_view), # URL for logout
	]