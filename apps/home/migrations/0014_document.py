# Generated by Django 4.1.4 on 2022-12-26 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0013_rename_id_beneficiario_beneficiario_beneficiario_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(max_length=20)),
                ('document_path', models.FilePathField(path=None)),
                ('server', models.CharField(max_length=150)),
            ],
        ),
    ]
