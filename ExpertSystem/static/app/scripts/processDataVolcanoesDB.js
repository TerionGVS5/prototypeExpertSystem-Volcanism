
var selectAllVolcanoesCountRun = 0, // Количество запусков функции selectAllVolcanoes
    selectActiveVolcanoesCountRun = 0, // Количество запусков функции selectActiveVolcanoes
    selectInactiveVolcanoesCountRun = 0, // Количество запусков функции selectInactiveVolcanoes()
    arrVolcanoesInfo = JSON.parse(volcanoesJsonFullInfo), // Структура: [номер [0 => id, 1 => name, 2 => latitude, 3 => longitude, 4 => active], ...]
    arrIdActiveVolcanoes = createArrIdActiveVolcanoes(), // Массив id действующих вулканов
    arrIdInactiveVolcanoes = createArrIdInactiveVolcanoes(); // Массив id потухших вулканов
    
function createJsonForYandexMap() {

    var jsonDataForYandexMap = "";
    // Формат JSON-строки для Яндекс.Карт
    jsonDataForYandexMap += '{ "type": "FeatureCollection",' +
        '"features": [';
    arrVolcanoesInfo.forEach(function(item, i, arr) {
        jsonDataForYandexMap +=  '{ "type": "Feature",' +
                                   '"id": ' + item[0] + ',' +
                                   '"geometry": {' +
                                        '"type": "Point",' +
                                        '"coordinates": [ ' + item[2] + ', ' + item[3] + ' ]' +
                                   '}, "properties": {' +
                                        '"hintContent": "' + item[1] + '"' +
                                 '}},';
    })
    jsonDataForYandexMap = jsonDataForYandexMap.slice(0, -1);
    jsonDataForYandexMap += ']}';
    return jsonDataForYandexMap;
} // Формироване JSON строки с данными вулканов для Яндекс.Карты

function showDescriptionVolcano(idVolcano) {

    $.ajax({
        url: "http://localhost:8000/get_info_volcano/?key=" + idVolcano,
        crossDomain: true
    }).done(function (data) {
        var nameVolcano = data.name, // Наименование вулкана
            srcImgVolcano = "http://localhost:8000/" + data.image.substring(4), // Путь к изображению вулкана с обрезкой первых 3-ех символов
            activityVolcano = data.activ, // Действующий или потухший
            latitude = data.latitude, // Широта
            longitude = data.longitude, // Долгота
            descriptionVolcano = data.description; // Описание вулкана
        // Изменение соответствующей информации
        $("#modal-header-text").text('Информация о вулкане: ' + nameVolcano);
        $("#modal-name-volcano").text(nameVolcano);
        $("#img-volcano").attr("src", srcImgVolcano);

        if (activityVolcano) {
            $("#activity-val").text("Действующий");
        } else {
            $("#activity-val").text("Потухший");
        }

        $("#latitude-val").text(latitude);
        $("#longitude-val").text(longitude);
        $("#description-volcano").text(descriptionVolcano);
        $("#infoVolcano").modal('show');
        });

} // Отображение информации о вулкане во всплывающем окне

function createArrIdActiveVolcanoes() {
    var arrIdActiveVolcanoes = new Array();
    arrVolcanoesInfo.forEach(function (item, i, arr) {
        if (item[4] == true) arrIdActiveVolcanoes.push(item[0]);
    })
    return arrIdActiveVolcanoes;
} // Создание массиа с id действующих вулканов

function createArrIdInactiveVolcanoes() {
    var arrIdInactiveVolcanoes = new Array();
    arrVolcanoesInfo.forEach(function (item, i, arr) {
        if (item[4] == false) arrIdInactiveVolcanoes.push(item[0]);
    })
    return arrIdInactiveVolcanoes;
} // Создание массива с id потухших вулканов

function selectAllVolcanoes() {
    var selectAllVolcanoesSpecialParam = "";
    selectAllVolcanoesCountRun++;
    if (selectAllVolcanoesCountRun % 2 == 0) selectAllVolcanoesSpecialParam = "onlyOff";
    else selectAllVolcanoesSpecialParam = "onlyOn";

    for (var i = 1; i <= arrVolcanoesInfo.length; i++) {
        selectVolcanoe(i, selectAllVolcanoesSpecialParam);
    }
} // Функция выбора всех вулканов

function selectActiveVolcanoes() {
    var selectActiveVolcanoesSpecialParam = "";
    selectActiveVolcanoesCountRun++;
    if (selectActiveVolcanoesCountRun % 2 == 0) selectActiveVolcanoesSpecialParam = "onlyOff";
    else selectActiveVolcanoesSpecialParam = "onlyOn";

    arrIdActiveVolcanoes.forEach(function (item, i, arr) {
        selectVolcanoe(item, selectActiveVolcanoesSpecialParam);
    }) 
} // Функция выбора действующих вулканов

function selectInactiveVolcanoes() {
    var selectInactiveVolcanoesSpecialParam = "";
    selectInactiveVolcanoesCountRun++;
    if (selectInactiveVolcanoesCountRun % 2 == 0) selectInactiveVolcanoesSpecialParam = "onlyOff";
    else selectInactiveVolcanoesSpecialParam = "onlyOn";

    arrIdInactiveVolcanoes.forEach(function (item, i, arr) {
        selectVolcanoe(item, selectInactiveVolcanoesSpecialParam);
    }) 
} // Функция выбора потухших вулканов

function createListVolcanoes() {
    $("#list-volcanoes").html(function() {
        var content = "";
        content += '' +
                    '<div class="row row-flex padding-bottom5px">' +
                        '<div class="col-xs-12 text-center">' + 
                            '<div id="groupBtnSelectVolcanoes" class="btn-group btn-group-justified padding-bottom5px hidden">' +
                                '<a href="#" class="btn btn-primary" onclick="selectAllVolcanoes()">Все</a>' +
                                '<a href="#" class="btn btn-primary" onclick="selectActiveVolcanoes()">Действующие</a>' +
                                '<a href="#" class="btn btn-primary" onclick="selectInactiveVolcanoes()">Потухшие</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' + 
                    '<ul class="list-group">';
        arrVolcanoesInfo.forEach(function (item, i, arr) {
            content += '<div class="row row-flex height45_6 padding-bottom5px">' +
                            '<div class="col-xs-9">' +
                                '<li id="' + item[0] + '" class="green list-group-item">' + item[1] + '</li>' +
                            '</div>' +
                            '<div class="col-xs-3">' +
                                '<button type="button" class="btn btn-block btn-height100" onclick="showDescriptionVolcano(' + item[0] + ')">Описание</button>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                        '</div>';
        });
        content += '</ul>';
        return content;
    });
} // Формирование списка вулканов

function sendResult() {
    selectedSigns = JSON.parse(sessionStorage.getItem("serializeSelectedSigns"));
    taskId = sessionStorage.getItem("taskId");
    l_count = $("#l_count").val();
    if (selectedVolcanoes.length != 0) {
        switch (taskId) {
            case '1':
                if ((selectedVolcanoes.length >= l_count) && (l_count >= 0)) {
                    $.get("/onegraph/", { l_count: l_count, array_sign_id: '[' + selectedSigns + ']', array_volcano_id: '[' + selectedVolcanoes + ']' })
                        .done(function (data) {
                            serializeArrClustersOnegraph = JSON.stringify(data);
                            sessionStorage('arrClustersOneGraph', serializeArrClustersOnegraph);
                            location.href = '/resultmethodonegraph';
                        })
                        .fail(function () {
                            alert("Ошибка при выполнении операции. Попробуйте повторить запрос");
                        });
                } else {
                    alert("Число кластеров не должно быть отрицательным или превышать выбранное количество вулканов");
                }
                break;
            case '2':
                $.get("/masks/", { array_volcano_id: '[' + selectedVolcanoes + ']', array_sign_id: '[' + selectedSigns + ']' })
                    .done(function (data) {
                        serializeArrClustersMasks = JSON.stringify(data);
                        sessionStorage('arrClustersMasks', serializeArrClustersMasks);
                        location.href = '/resultmethodmasks';                  
                    })
                    .fail(function () {
                        alert("Ошибка при выполнении операции. Попробуйте повторить запрос");
                    });
                break;
            default:
                alert("Данный метод не реализован");
                break;
        } 
    } else {
        alert("Необходимо выбрать как минимум один вулкан");
    }
} // Передача значений заранее выбранному методу, сохранение полученного результата и переход на страницу с результатом работы метода

function onElemForCatalog() {
    var referrer = document.referrer;
    if (referrer.indexOf("/signs") != -1) {
        $("#header-maps").html(function () {
            var content = "";
            content = '<h4 class=" page-header">Выберите необходимые вулканы из списка и/или по группам' +
                'и укажите количество кластеров, не превышающее число, выбранных вулканов</h4 >'
            return content;
        });
        $("#groupBtnSelectVolcanoes").removeClass("hidden");
        $("#btn-next").removeClass("hidden");
        taskId = sessionStorage.getItem("taskId");
        if (taskId == 1) {
            $("#l-count").removeClass("hidden");
        }
    } else {
        $("#header-maps").html(function () {
            var content = "";
            content = '<h2 class=" page-header">Каталог вулканов Камчатки</h2>'
            return content;
        });
    }
} /* Включение элементов перехода на странице вулканов при решении задачи, подстановка необходимого заголовка, 
                                  включение ввода значения l_count для метода односвязного графа */

createListVolcanoes();

onElemForCatalog();