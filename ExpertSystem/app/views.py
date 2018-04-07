﻿"""
Definition of views.
"""

from django.shortcuts import render
from app.forms import *
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime
from django.views import View
from django.http import HttpResponseRedirect
from app.models import *
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic.edit import UpdateView
from openpyxl import load_workbook
from django.core.exceptions import ObjectDoesNotExist
import os
from django.http import HttpResponse
from django.http import JsonResponse

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )

def maps(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    vulcanoseFullInfo = Volcano.objects.all().values_list('pk','name', 'latitude', 'longitude')
    vulcanoseName = Volcano.objects.all().values_list('pk', 'name')
    vulcanoseStrFullInfo = json.dumps(list(vulcanoseFullInfo), cls=DjangoJSONEncoder)
    vulcanoseStrName = json.dumps(list(vulcanoseName), cls=DjangoJSONEncoder)
    return render(
        request,
        'app/maps.html',
        {
            'title':'Maps',
            'vulcanoseArrFullInfo':vulcanoseStrFullInfo,
            'vulcanoseStrName': vulcanoseStrName,
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        {
            'title':'About',
            'message':'Your application description page.',
            'year':datetime.now().year,
        }
    )

class Addsign(View):
    classform = SignAddForm
    template_name='app/addsign.html'
    title='Добавление Свойств'
    def get(self,request):
        form = self.classform()
        return render(request,self.template_name,{'title':self.title,'form':form})
    def post(self,request):
        form = self.classform(request.POST)
        new_sign = form.save()
        return HttpResponseRedirect('/addsign')

class Addvalue(View):
    classform = ValueAddForm
    template_name='app/addvalue.html'
    title='Установка значений свойств'
    def get(self,request):
        form = self.classform()
        return render(request,self.template_name,{'title':self.title,'form':form})
    def post(self,request):
        form = self.classform(request.POST)
        new_sign = form.save()
        return HttpResponseRedirect('/addvalue')

class Addgroupvolcano(View):
    classform = GroupVolcanoAddForm
    template_name='app/addgroupvolcano.html'
    title='Добавление груп вулканов'
    def get(self,request):
        form = self.classform()
        return render(request,self.template_name,{'title':self.title,'form':form})
    def post(self,request):
        form = self.classform(request.POST)
        new_sign = form.save()
        return HttpResponseRedirect('/addgroupvolcano')

class Addvolcano(View):
    classform = VolcanoAddForm
    template_name='app/addvolcano.html'
    title='Добавление вулканов'
    def get(self,request):
        form = self.classform()
        return render(request,self.template_name,{'title':self.title,'form':form})
    def post(self,request):
        form = self.classform(request.POST)
        new_sign = form.save()
        return HttpResponseRedirect('/addvolcano')

class VolcanoUpdate(UpdateView):
    model = Volcano
    fields = ['name', 'latitude', 'longitude','activ', 'groupvolcano','description','image']
    template_name_suffix = '_update_form'
    success_url = '/'

class SelectVolcano(View):
    classform = VolcanoSelectForm
    template_name='app/selectvolcano.html'
    title='Выбор вулканов'
    def get(self,request):
        form = self.classform()
        return render(request,self.template_name,{'title':self.title,'form':form})
    def post(self,request):
        form = self.classform(request.POST)
        if form.is_valid():
            key = form.cleaned_data['volcano'].pk
            return HttpResponseRedirect('/updatevolcano/{}/'.format(key))

def fillDB(request):
    data_values = Value.objects.all().count()
    if data_values !=0:
        return HttpResponse("В базе уже что-то есть. Нужно очистить сначала")
    else:
        path = os.path.abspath("data.xlsx")
        wb = load_workbook(path)
        ws = wb.active
        row_num = 0
        for row in ws.iter_rows():
            row_num+=1
            column_num=0
            for cell in row:
                column_num+=1
                try:
                    volcan_now = Volcano.objects.get(pk=row_num)
                    sign_now = Sign.objects.get(pk=column_num)
                except ObjectDoesNotExist:
                    continue
                value_now = Value(value = cell.value,volcano = volcan_now, sign = sign_now)
                value_now.save()

        return HttpResponse("Вроде заполнилось всё")

def getInfoVolcano(request):
    key = request.GET.get('key')
    volcano_info = Volcano.objects.get(pk=key)
    data = {}
    data['name']=volcano_info.name
    data['latitude']=volcano_info.latitude
    data['longitude']=volcano_info.longitude
    data['activ']=volcano_info.activ
    data['description']=volcano_info.description
    data['image']=str(volcano_info.image)
    json_data=json.dumps(data, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')