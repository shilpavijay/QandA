# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quorahome', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ans_Com',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ans', models.ForeignKey(to='quorahome.Answers')),
                ('comment', models.ForeignKey(to='quorahome.Comments')),
            ],
        ),
    ]
