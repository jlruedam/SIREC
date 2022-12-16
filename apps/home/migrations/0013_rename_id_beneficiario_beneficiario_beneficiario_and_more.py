# Generated by Django 4.1.4 on 2022-12-15 14:42

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0012_beneficiario_solicitudrecurso_solicitud_asociada_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='beneficiario',
            old_name='id_beneficiario',
            new_name='beneficiario',
        ),
        migrations.AddField(
            model_name='beneficiario',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='beneficiario',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
