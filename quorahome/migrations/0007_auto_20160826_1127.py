# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quorahome', '0006_auto_20160826_1125'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ans', models.CharField(max_length=1000)),
                ('upvote', models.IntegerField(default=0, null=True)),
                ('date', models.DateTimeField(verbose_name=b'date published')),
                ('qion', models.ForeignKey(to='quorahome.Question')),
                ('username', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('upvote', models.IntegerField(default=0, null=True)),
                ('date', models.DateTimeField(verbose_name=b'date published')),
                ('comment', models.ForeignKey(to='quorahome.Question')),
                ('username', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='answers',
            name='qion',
        ),
        migrations.RemoveField(
            model_name='answers',
            name='username',
        ),
        migrations.RemoveField(
            model_name='comments',
            name='comment',
        ),
        migrations.RemoveField(
            model_name='comments',
            name='username',
        ),
        migrations.AlterField(
            model_name='ans_com',
            name='ans',
            field=models.ForeignKey(to='quorahome.Answer'),
        ),
        migrations.AlterField(
            model_name='ans_com',
            name='comment',
            field=models.ForeignKey(to='quorahome.Comment'),
        ),
        migrations.DeleteModel(
            name='Answers',
        ),
        migrations.DeleteModel(
            name='Comments',
        ),
    ]
