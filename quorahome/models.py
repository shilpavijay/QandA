from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager


class UserProfile(models.Model):
	user = models.OneToOneField(User)
	specialization = models.CharField(max_length = 200)

class Relship(models.Model):
	username  = models.ForeignKey(User) 
	following = models.CharField(max_length=50,null=True) 
	followers = models.CharField(max_length=50,null=True) 

	# def __str__(self):
	# 	return "%s %s %s" % (self.username,self.following,self.followers)

class Question(models.Model):
	username = models.ForeignKey(User)
	qion = models.CharField(max_length = 1000)
	category = models.CharField(max_length=50, null =True)
	date = models.DateTimeField('date published')
	tags = TaggableManager(blank=True)
	# def __str__(self):
	# 	return self.qion, self.username, self.category, self.date
class Answer(models.Model):
	username = models.ForeignKey(User)
	qion = models.ForeignKey(Question)
	ans = models.CharField(max_length=1000)
	upvote = models.IntegerField(default=0)
	date = models.DateTimeField('date published')

	# def __str__(self):
	# 	return self.username, self.ans, self.date, self.upvote
class Comment(models.Model):
	username = models.ForeignKey(User)
	com = models.CharField(max_length = 1000)
	answer = models.ForeignKey(Answer)
	upvote = models.IntegerField(default=0)
	date = models.DateTimeField('date published')


class Ans_Com(models.Model):
	# comment = models.ForeignKey(Comment)
	ans = models.ForeignKey(Answer)	




