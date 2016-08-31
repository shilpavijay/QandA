# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quorahome', '0005_auto_20160826_1123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answers',
            name='upvote',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='comments',
            name='upvote',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
