from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from quorahome.views import *


urlpatterns = [
	url(r'^$', ulogin), 			#renders and validates login
	url(r'', include('social.apps.django_app.urls', namespace='social')),
	url('', include('django.contrib.auth.urls',namespace='auth')),
	url(r'^main/$',mainpg),
	url(r'^upvote/$',upvote),
	url(r'^downvote/$',downvote),
	url(r'^answer/$',answer),
	url(r'^ans_count/',anspg_count),
	url(r'^feed/$',feed), 			#feed details - main page
	url(r'^users/folusers/$', foll_users),#used for following other users (admin purpose) 
	url(r'^users/$', user_list), 	#renders page - list of users to follow
	url(r'^main/[0-9]+/$', qonlypg), 
	url(r'^ajaxcall/(?P<question>[0-9]+)/$', ret_ans), 
	url(r'^askq/$',qasked),
	url(r'^signup/$',signup),
	url(r'^logout/$', 'django.contrib.auth.views.logout'),
	url(r'^user/(?P<username>.*)/$', user),
	url(r'^userq/(?P<username>.*)/$', userquestion),
	url(r'^userans/(?P<username>.*)/$', userans),
	url(r'^addcomment/$',commentadd),
	url(r'^get_comments/(?P<ans>.*)/$',getComments),
	]