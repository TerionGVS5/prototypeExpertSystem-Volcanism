var selectAllVolcanoesCountRun = 0;

function parseParamVolcanoes(vulcanoseStrName) {
    // Парсинг наименований вулканов и id
    var volcanoesArr = JSON.parse(vulcanoseStrName),
        volcanoesArrId = new Array(),
        volcanoesArrName = new Array();
    for (var i = 0; i < volcanoesArr.length; i++) {
        volcanoesArrId.push(volcanoesArr[i][0]);
        volcanoesArrName.push(volcanoesArr[i][1]);
    }
    // Создание и возврат массива из массивов id и наименований вулканов
    var arrVolcanoesParam = new Array();
    arrVolcanoesParam.push(volcanoesArrId, volcanoesArrName);
    return arrVolcanoesParam;
} // Парсинг наименований вулканов и id

function createJsonForYandexMap() {

    var volcanoesArrInfo = JSON.parse(vulcanoseStrFullInfo),
        jsonDataForYandexMap = "";
    // Формат JSON-строки для Яндекс.Карт
    jsonDataForYandexMap += '{ "type": "FeatureCollection",' +
                              '"features": [';
    for (var i = 0; i < volcanoesArrInfo.length; i++) {
        jsonDataForYandexMap +=  '{ "type": "Feature",' +
                                   '"id": ' + volcanoesArrInfo[i][0] + ',' +
                                   '"geometry": {' +
                                        '"type": "Point",' +
                                        '"coordinates": [ ' + volcanoesArrInfo[i][2] + ', ' + volcanoesArrInfo[i][3] + ' ]' +
                                   '}, "properties": {' +
                                        '"hintContent": "' + volcanoesArrInfo[i][1] + '"' +
                                 '}},';
    }
    jsonDataForYandexMap = jsonDataForYandexMap.slice(0, -1);
    jsonDataForYandexMap += ']}';
    return jsonDataForYandexMap;
} // Формироване JSON строки с данными вулканов для Яндекс.Карты

function showDescriptionVolcano(idVolcano) {

    $.ajax({
        url: "http://localhost:8000/get_info_volcano/?key=" + idVolcano
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

} // Отбражение информации о вулкане во всплывающем окне

function selectAllVolcanoes(totalVolcanoes) {
    selectAllVolcanoesCountRun++;
    console.log(selectAllVolcanoesCountRun);
    if (selectAllVolcanoesCountRun % 2 == 0) selectAllVolcanoesSpecialParam = "onlyOff";
    else selectAllVolcanoesSpecialParam = "onlyOn";

    for (var i = 1; i <= totalVolcanoes; i++) {
        selectVolcanoe(i, selectAllVolcanoesSpecialParam);
    }
} // Функция выбора всех вулканов

function sendResult() {
    jsonStr = JSON.stringify(selectedVolcanoes);
    console.log(jsonStr);
}

var arrVolcanoesParam = parseParamVolcanoes(vulcanoseStrName),
    volcanoesArrId = arrVolcanoesParam[0], // Массив id вулканов
    volcanoesArrName = arrVolcanoesParam[1], // Массив наименований вулканов
    divListVolcanoes = document.getElementById("list-volcanoes");
    
divListVolcanoes.innerHTML = '<h3 class="margin-top-off margin-bottom-off">Выберите необходимые вулканы из списка и/или по группам:</h3><br/>' +
                             '<div class="btn-group">' +
                                '<button type="button" class="btn btn-primary" style="margin-right: 5px" onclick="selectAllVolcanoes(' +
                                        volcanoesArrId.length + ')">Все</button>' +
                                '<button type="button" class="btn btn-primary" style="margin-right: 5px" onclick="">Действующие</button>' + 
                                '<button type="button" class="btn btn-primary" style="margin-right: 5px" onclick="">Потухшие</button>' +
                             '</div>' +
                             '<ul class="list-group">';
// Формирование списка вулканов
volcanoesArrName.forEach(function (item, i, arr) {
    divListVolcanoes.innerHTML += '<div class="row row-flex height45_6 padding-bottom5px">' +
                                       '<div class="col-xs-9">' +
                                           '<li id="' + volcanoesArrId[i] + '" class="green list-group-item">' + item + '</li>' +
                                       '</div>' +
                                       '<div class="col-xs-3">' +
                                           '<button type="button" class="btn btn-block btn-height100" onclick="showDescriptionVolcano(' +
                                                   volcanoesArrId[i] + ')">Описание</button>' +
                                       '</div>' +
                                       '<div class="clearfix"></div>' +
                                  '</div>';
});
divListVolcanoes.innerHTML += '</ul>';
