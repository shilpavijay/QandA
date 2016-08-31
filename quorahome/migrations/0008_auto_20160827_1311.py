# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quorahome', '0007_auto_20160826_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='upvote',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='comment',
            name='upvote',
            field=models.IntegerField(default=0),
        ),
    ]
