# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quorahome', '0004_auto_20160826_1120'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answers',
            name='comment',
        ),
        migrations.AlterField(
            model_name='answers',
            name='upvote',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='comments',
            name='upvote',
            field=models.IntegerField(null=True),
        ),
    ]
