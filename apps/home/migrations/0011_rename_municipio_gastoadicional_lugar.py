# Generated by Django 3.2.6 on 2022-11-28 20:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_rename_minicipio_gastoadicional_municipio'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gastoadicional',
            old_name='municipio',
            new_name='lugar',
        ),
    ]