"""
Definition of models.
"""

from django.db import models

# Create your models here.
class Volcano(models.Model):
    name = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    def __str__(self):
        return self.name