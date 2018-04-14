"""
Definition of forms.
"""

from django.forms import ModelForm
from app.models import Volcano
from app.models import GroupVolcano
from app.models import Value
from django import forms
from app.models import Sign
from django.contrib.auth.forms import AuthenticationForm
from django.utils.translation import ugettext_lazy as _

class BootstrapAuthenticationForm(AuthenticationForm):
    """Authentication form which uses boostrap CSS."""
    username = forms.CharField(max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'User name'}))
    password = forms.CharField(label=_("Password"),
                               widget=forms.PasswordInput({
                                   'class': 'form-control',
                                   'placeholder':'Password'}))

class SignAddForm(ModelForm):
    class Meta:
        model = Sign
        fields = ['name','number', 'groupsign']
        labels = {
            'name':'Имя',
            'number':'Номер',
            'groupsign':'Группа признаков'
            }
        widgets = {
            'name': forms.TextInput({'class': 'form-control'}),
            'number': forms.NumberInput({'class': 'form-control'}),
            'groupsign':forms.Select({'class': 'form-control'})
            }

class ValueAddForm(ModelForm):
    class Meta:
        model = Value
        fields = ['value','volcano','sign']
        labels = {
            'value':'Значение',
            'volcano':'Вулкан',
            'sign':'Признак'
            }
        widgets = {
            'value': forms.CheckboxInput({'class': 'form-control'}),
            'volcano': forms.Select({'class': 'form-control'}),
            'sign':forms.Select({'class': 'form-control'})
            }

class GroupVolcanoAddForm(ModelForm):
    class Meta:
        model = GroupVolcano
        fields = ['name']
        labels = {
            'name':'Имя'
            }
        widgets = {
            'name': forms.TextInput({'class': 'form-control'})
            }

class VolcanoAddForm(ModelForm):
    class Meta:
        model = Volcano
        fields = ['name','groupvolcano','latitude','longitude','activ','description','image']
        labels = {
            'name':'Имя',
            'groupvolcano':'Группа',
            'latitude':'Ширина',
            'longitude':'Долгота',
            'activ':'Активность',
            'description':'Описание',
            'image':'Картинка'
            }
        widgets = {
            'name': forms.TextInput({'class': 'form-control'}),
            'groupvolcano': forms.Select({'class': 'form-control'}),
            'activ':forms.CheckboxInput({'class': 'form-control'}),
            'latitude': forms.NumberInput({'class': 'form-control'}),
            'longitude': forms.NumberInput({'class': 'form-control'}),
            'image': forms.ClearableFileInput({'class': 'form-control'}),
            'description': forms.Textarea({'class': 'form-control'})
            }

class VolcanoSelectForm(forms.Form):
    volcano = forms.ModelChoiceField(queryset=Volcano.objects.all(), empty_label="(Nothing)", label='Вулкан', widget=forms.Select({'class': 'form-control'}))

class VolcanoUpdateForm(ModelForm):
    class Meta:
        model = Volcano
        fields = ['name','groupvolcano','latitude','longitude','activ','description','image']
        labels = {
            'name':'Имя',
            'groupvolcano':'Группа',
            'latitude':'Ширина',
            'longitude':'Долгота',
            'activ':'Активность',
            'description':'Описание',
            'image':'Картинка'
            }
        widgets = {
            'name': forms.TextInput({'class': 'form-control'}),
            'groupvolcano': forms.Select({'class': 'form-control'}),
            'activ':forms.CheckboxInput({'class': 'form-control'}),
            'latitude': forms.NumberInput({'class': 'form-control'}),
            'longitude': forms.NumberInput({'class': 'form-control'}),
            'image': forms.ClearableFileInput({'class': 'form-control'}),
            'description': forms.Textarea({'class': 'form-control'})
            }