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

class GroupSign(models.Model):
    name = models.CharField(max_length=150)
    def __str__(self):
        return self.name

class Sign(models.Model):
    name = models.CharField(max_length=150)
    value = models.BooleanField()
    volcano = models.ForeignKey('Volcano', on_delete=models.CASCADE)
    groupsign = models.ForeignKey('GroupSign', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

