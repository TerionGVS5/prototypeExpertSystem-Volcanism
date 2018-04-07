"""
Definition of models.
"""

from django.db import models

# Create your models here.
class Volcano(models.Model):
    name = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    activ = models.BooleanField(default = False)
    groupvolcano = models.ForeignKey('GroupVolcano',null = True,on_delete = models.CASCADE)
    def __str__(self):
        return self.name +' '+  str(self.pk)

class GroupVolcano(models.Model):
    name = models.CharField(max_length=150)
    def __str__(self):
        return self.name

class GroupSign(models.Model):
    name = models.CharField(max_length=150)
    def __str__(self):
        return self.name

class Sign(models.Model):
    name = models.CharField(max_length=150)
    number = models.IntegerField()
    groupsign = models.ForeignKey('GroupSign',on_delete = models.CASCADE)
    def __str__(self):
        return self.name+' '+str(self.number)

class Value(models.Model):
    value = models.BooleanField()
    volcano = models.ForeignKey('Volcano', on_delete=models.CASCADE)
    sign = models.ForeignKey('Sign', on_delete=models.CASCADE)
    def __str__(self):
        return str(self.value)


