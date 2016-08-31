from django.contrib import admin
from .models import UserProfile,Question, Relship, Answer, Comment, Ans_Com
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Question)
admin.site.register(Relship)
admin.site.register(Answer)
admin.site.register(Comment)
admin.site.register(Ans_Com)