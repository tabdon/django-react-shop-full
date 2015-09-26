# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('full_name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=75)),
                ('stripe_id', models.CharField(max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('desc', models.TextField(max_length=500)),
                ('mfg', models.CharField(max_length=50)),
                ('price', models.DecimalField(max_digits=7, decimal_places=2)),
                ('image', models.URLField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('full_name', models.CharField(max_length=200)),
                ('rating', models.IntegerField()),
                ('comment', models.TextField(max_length=500)),
                ('product', models.ForeignKey(to='core.Product')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(to='core.Product'),
            preserve_default=True,
        ),
    ]
