"""
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
import copy

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
            'vulcanoseStrFullInfo':vulcanoseStrFullInfo,
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

def onegraph(request):
    l_count = int(request.GET.get('l_count'))
    array_volcano_id = json.loads(request.GET.get('array_volcano_id'))
    array_sign_id = json.loads(request.GET.get('array_sign_id'))
    matrix_h = [[0 for j in range(0,len(array_sign_id))] for i in range(0,len(array_volcano_id))]
    who_is_who = {}
    for volcano_id in array_volcano_id:
        for sign_id in array_sign_id:
            matrix_h[array_volcano_id.index(volcano_id)][array_sign_id.index(sign_id)] = int(Value.objects.get(volcano = volcano_id, sign = sign_id).value)
            who_is_who[array_volcano_id.index(volcano_id)] = volcano_id

    def get_diff(string1, string2):
        diff = 0
        for index in range(0, len(string1)):
            if string1[index] != string2[index]:
                diff += 1
        return diff


    def make_new_matrix(input_matrix):
        new_matrix = []
        for string in input_matrix:
            string_to_append = []
            for next_s in input_matrix:
                diff = get_diff(string, next_s)
                string_to_append.append(diff)
            new_matrix.append(string_to_append)
        return new_matrix


    def remove_diagonal(input_matrix):
        for i in range(0, len(input_matrix)):
            for j in range(0, len(input_matrix)):
                if i == j:
                    input_matrix[i][j] = -1
        return input_matrix


    def remove_index(input_matrix, index_to_remove):
        for i in range(0, len(input_matrix)):
            for j in range(0, len(input_matrix)):
                if i == index_to_remove or j == index_to_remove:
                    input_matrix[i][j] = -1
        return input_matrix


    def first_find_min(input_matrix):
        min = 1000
        way = []
        distances = []
        index_to_remove = 0
        index_to_continue = 0
        for i in range(0, len(input_matrix)):
            for j in range(0, len(input_matrix)):
                if input_matrix[i][j] == -1:
                    continue
                if input_matrix[i][j] < min:
                    min = input_matrix[i][j]
                    index_to_remove = i
                    index_to_continue = j
        new_matrix = remove_index(input_matrix, index_to_remove)
        way.append(index_to_remove + 1)
        distances.append(min)
        return new_matrix, index_to_continue, way, distances


    def append_last_way(way, input_matrix):
        for index in range(0, len(input_matrix)):
            if index + 1 not in way:
                new_way = way
                new_way.append(index + 1)
                return new_way


    def just_find_min(input_matrix, index_to_continue, way, distances):
        min = 1000
        index_to_remove = 0
        new_index_to_continue = 0
        for j in range(0, len(input_matrix)):
            if input_matrix[index_to_continue][j] == -1:
                continue
            if input_matrix[index_to_continue][j] < min:
                min = input_matrix[index_to_continue][j]
                index_to_remove = index_to_continue
                new_index_to_continue = j
        if min == 1000:
            new_way = append_last_way(way, input_matrix)
            return new_way, distances
        else:
            new_matrix = remove_index(input_matrix, index_to_remove)
            new_way = way
            new_way.append(index_to_remove + 1)
            new_distances = distances
            new_distances.append(min)
            return just_find_min(new_matrix, new_index_to_continue, new_way, new_distances)


    def make_sets(way, distances, l_count):
        r = l_count - 1
        exclude = []
        result_sets = []
        while len(exclude) != r:
            max = -1
            index_to_exclude = -1
            for index in range(0, len(distances)):
                if index in exclude:
                    continue
                if distances[index] > max:
                    max = distances[index]
                    index_to_exclude = index
            exclude.append(index_to_exclude)
        set_to_append = []
        for index in range(0, len(way)):
            set_to_append.append(way[index])
            if index in exclude:
                result_sets.append(set_to_append)
                set_to_append = []
        result_sets.append(set_to_append)
        return result_sets


    def main(MATRIX_H, L_COUNT):
        matrix = make_new_matrix(MATRIX_H)
        obj_matrix = copy.deepcopy(matrix)
        matrix = remove_diagonal(matrix)
        matrix, index_to_continue, way, distances = first_find_min(matrix)
        way, distances = just_find_min(matrix, index_to_continue, way, distances)
        sets=make_sets(way, distances, L_COUNT)
        return obj_matrix,way,distances,sets
    obj_matrix,way,distances,sets = main(matrix_h,l_count)
    new_sets = copy.deepcopy(sets)
    for i in range(0,len(sets)):
        for j in range(0,len(sets[i])):
            new_sets[i][j] = who_is_who[sets[i][j]-1]
    json_data=json.dumps(new_sets, cls=DjangoJSONEncoder)
    return HttpResponse(json_data, content_type='application/json')