# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quorahome', '0003_auto_20160826_1110'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answers',
            name='category',
        ),
        migrations.AddField(
            model_name='question',
            name='category',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
