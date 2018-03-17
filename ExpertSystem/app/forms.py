"""
Definition of forms.
"""

from django.forms import ModelForm
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
        fields = ['name', 'value', 'volcano', 'groupsign']
