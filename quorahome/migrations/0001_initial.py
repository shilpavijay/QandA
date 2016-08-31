# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ans', models.CharField(max_length=1000)),
                ('category', models.CharField(max_length=50)),
                ('upvote', models.IntegerField()),
                ('date', models.DateTimeField(verbose_name=b'date published')),
            ],
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('upvote', models.IntegerField()),
                ('date', models.DateTimeField(verbose_name=b'date published')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('qion', models.CharField(max_length=1000)),
                ('date', models.DateTimeField(verbose_name=b'date published')),
            ],
        ),
        migrations.CreateModel(
            name='Relship',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('following', models.CharField(max_length=50, null=True)),
                ('followers', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('specialization', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='relship',
            name='username',
            field=models.ForeignKey(to='quorahome.User'),
        ),
        migrations.AddField(
            model_name='question',
            name='username',
            field=models.ForeignKey(to='quorahome.User'),
        ),
        migrations.AddField(
            model_name='comments',
            name='comment',
            field=models.ForeignKey(to='quorahome.Question'),
        ),
        migrations.AddField(
            model_name='comments',
            name='username',
            field=models.ForeignKey(to='quorahome.User'),
        ),
        migrations.AddField(
            model_name='answers',
            name='comment',
            field=models.ForeignKey(to='quorahome.Comments'),
        ),
        migrations.AddField(
            model_name='answers',
            name='qion',
            field=models.ForeignKey(to='quorahome.Question'),
        ),
        migrations.AddField(
            model_name='answers',
            name='username',
            field=models.ForeignKey(to='quorahome.User'),
        ),
    ]
