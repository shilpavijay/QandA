from django.shortcuts import render, redirect, render_to_response
from .models import *
from django.template.context import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from collections  import OrderedDict,defaultdict
from django.utils import timezone
import json

# Create your views here.
@csrf_exempt
@login_required(login_url='/')
def mainpg(request):	
	return render_to_response('quora.html', context_instance=RequestContext(request))

@csrf_exempt
@login_required(login_url='/')
def upvote(request):
	if request.method == 'POST' and request.is_ajax:
		vote = request.POST.get("clicked",False)
		answer = request.POST.get("ans",False)
		ansObj=Answer.objects.filter(ans__startswith=answer)
		vote = ansObj[0].upvote + 1
		Answer.objects.filter(ans__startswith=answer).update(upvote=vote)
	return HttpResponse("pass")


def downvote(request):
	if request.method == 'POST' and request.is_ajax:
		vote = request.POST.get("clicked",False)
		answer = request.POST.get("ans",False)
		print vote,answer
		ansObj=Answer.objects.filter(ans__startswith=answer)
		vote = ansObj[0].upvote - 1
		print vote
		a=Answer.objects.filter(ans__startswith=answer).update(upvote=vote)
		print a
	return HttpResponse("pass")	


@csrf_exempt
@login_required(login_url='/')
def qasked(request):
	qasked = request.POST.get("askquestion",False)
	print qasked
	newQ = Question()
	newQ.username = request.user
	newQ.qion = qasked
	newQ.category = "userreq"
	newQ.date = timezone.now()
	newQ.save()
	return HttpResponse("pass")

@csrf_exempt
def signup(request):
	if request.method == 'POST' and request.is_ajax:
		usernm = request.POST.get("username",False)
		print usernm
		pswd = request.POST.get("password",False)
		newUser = User()
		newUser.username = usernm
		newUser.password = pswd
		newUser.save()
	return render_to_response('signup.html', context_instance=RequestContext(request))


@csrf_exempt
@login_required(login_url='/')
def answer(request):
	if request.method == 'POST' and request.is_ajax:
		question = request.POST.get("forquestion",False)
		answer = request.POST.get("answritten",False)
		qObj = Question.objects.filter(qion__startswith=question)
		newAns = Answer()
		newAns.username = request.user
		newAns.qion = qObj[0]
		newAns.ans = answer
		newAns.upvote = 0
		newAns.date = timezone.now()
		newAns.save()
	return render_to_response('answer.html', context_instance=RequestContext(request))

# @csrf_exempt
# def content(request):

# 	return HttpResponse("pass") 
 
def anspg_count(request):
	anspg = defaultdict()
	q=Question.objects.all();
	for each in q:
		count = Answer.objects.filter(qion=each).count();
		anspg[each.qion] = [each.id,count]
	return HttpResponse(json.dumps(anspg))

def user(request,username):
	return render(request,'user.html')

class OrderedDefaultDict(OrderedDict):
    def __init__(self, default_factory=None, *args, **kwargs):
        super(OrderedDefaultDict, self).__init__(*args, **kwargs)
        self.default_factory = default_factory
    def __missing__(self, key):
        if self.default_factory is None:
            raise KeyError(key)
        val = self[key] = self.default_factory()
        return val

def feed(request):
	# get all the Questions - sort - get answers for each question and return as JSON
	qanda = OrderedDefaultDict(OrderedDict(defaultdict())) #ex:{q:{a1:v1,a2:v2},...}	
	# temp ={}
	ansO = Answer.objects.order_by('-upvote')
	for a in ansO:
		q = Question.objects.get(qion = a.qion.qion)
		if q.qion not in qanda.keys():
			qanda[q.qion]={a.ans:[a.upvote,a.date.strftime('%d-%m-%Y %H:%M')]}
		else:
			if a.upvote > qanda[q.qion].values():
				qanda[q.qion]={a.ans:[a.upvote,a.date.strftime('%d-%m-%Y %H:%M')]}
	return HttpResponse(json.dumps(OrderedDict(qanda.items())))

def userans(request,username):
	u = username
	qanda = OrderedDefaultDict(OrderedDict(defaultdict()))#ex:{q:{a1:v1,a2:v2},...}	
	user = User.objects.get(username=u)
	answers = Answer.objects.filter(username=user)
	for a in answers:
		qObj = Question.objects.get(qion = a.qion.qion)
		if qObj.qion not in qanda.keys():
			qanda[qObj.qion]={a.ans:[a.upvote,a.date.strftime('%d-%m-%Y %H:%M')]}
		else:
			qanda[qObj.qion].update({a.ans:[a.upvote,a.date.strftime('%d-%m-%Y %H:%M')]})
	return HttpResponse(json.dumps(OrderedDict(qanda.items())))

def userquestion(request,username):
	u = username
	anspg = defaultdict()
	user = User.objects.get(username=u)
	q=Question.objects.filter(username=user);
	for each in q:
		count = Answer.objects.filter(qion=each).count();
		anspg[each.qion] = [each.id,count]
	return HttpResponse(json.dumps(anspg))


@csrf_exempt
@login_required(login_url='/')
def foll_users(request):
	users={}
	temp={}
	usernm = request.user.username
	print usernm
	cur_user = request.user
	foll_list = Relship.objects.filter(username=cur_user,followers='NA')
	for d in User.objects.all():
		for u in foll_list:
			if d.username != usernm and d.username != u.following: 
				temp[d] = d
	print temp
	return HttpResponse(serializers.serialize('json',temp))
	

@csrf_exempt
@login_required(login_url='/')
def user_list(request): 
	if request.method == 'POST' and request.is_ajax:
		rec=request.POST.get("selection",False)
		foll=User.objects.get(username=rec)
		#adding following to current user
		print foll
		b = Relship()
		b.username = request.user
		b.following = foll
		b.followers = 'NA'
		b.save() 
		#adding follower to user clicked on
		b=Relship()
		b.username = foll
		b.following = 'NA'
		b.followers = request.user.username
		b.save()
	return render(request, 'users.html')	

@csrf_exempt
def ulogin(request):
	if request.method == 'POST' and request.is_ajax:
		usernm = request.POST.get("username",False)
		print usernm
		pswd = request.POST.get("password",False)
		auth = authenticate(username=usernm,password=pswd)
		if auth is not None:
			print("User is valid and authenticated")
			login(request,auth)
			print("login done returning...")
			return HttpResponse("pass")
		else:
			logout(request)
			print("Wrong username or password entered. Please check.")
	return render(request,'login.html')		


@csrf_exempt
def ret_ans(request,question):
	q = eval(question)
	qanda = OrderedDefaultDict(OrderedDict(defaultdict())) #ex:{q:{a1:v1,a2:v2},...}	
	qObj = Question.objects.get(id=q)
	answers = Answer.objects.filter(qion=qObj)

	ansO = answers.order_by('-upvote')
	for a in ansO:
		q = Question.objects.get(qion = a.qion.qion)
		if qObj.qion not in qanda.keys():
			qanda[qObj.qion]={a.ans:[a.upvote,a.date.strftime('%d-%m-%Y %H:%M')]}
		else:
			qanda[qObj.qion].update({a.ans:[a.upvote,a.date.strftime('%d-%m-%Y %H:%M')]})
	return HttpResponse(json.dumps(OrderedDict(qanda.items())))

def qonlypg(request):
	return render(request,'qonlypg.html')	


@csrf_exempt
def logout_view(request):
	logout(request)
	return(render(request,'login.html'))	