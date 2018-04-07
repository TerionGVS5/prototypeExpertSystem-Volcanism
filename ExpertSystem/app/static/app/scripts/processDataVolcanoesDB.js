function parseParamVolcanoes(vulcanoseStrName) {
    // Парсинг наименований вулканов и id с помощью регулярных выражений
    vulcanoseStrName = vulcanoseStrName.replace(new RegExp("\"\\],", 'g'), "!");
    vulcanoseStrName = vulcanoseStrName.replace(new RegExp("\\[", 'g'), "");
    vulcanoseStrName = vulcanoseStrName.replace(new RegExp("\"", 'g'), "");
    vulcanoseStrName = vulcanoseStrName.replace(new RegExp("\\]\\]", 'g'), "");
    vulcanoseStrId = vulcanoseStrName.replace(new RegExp("\\s[а-яА-Я,-]*", 'ug'), "");
    vulcanoseStrName = vulcanoseStrName.replace(new RegExp("[\\d,]", 'g'), "");
    // Преобразование строки в массив элементов
    var volcanoesArrName = vulcanoseStrName.split('! ');
    var volcanoesArrId = vulcanoseStrId.split(',!');
    // Создание и возврат массива из массивов id и наименований вулканов
    var arrVolcanoesParam = new Array();
    arrVolcanoesParam.push(volcanoesArrId, volcanoesArrName);
    return arrVolcanoesParam;
} // Парсинг наименований вулканов и id

function createJsonForYandexMap() {

} // Формироване JSON строки с данными вулканов для Яндекс.Карты

function showDescriptionVolcano(idVolcano) {

    $.ajax({
        url: 'http://localhost:8000/get_info_volcano/?key=' + idVolcano
    }).done(function (data) {
        var infoVolcano = data;
        });
    
    var nameVolcano = "Безымяный",
        srcImgVolcano = "http://jurmalacamp.com/mz/sudxsupes/img795744.jpg",
        activityVolcano = false,
        latitude = "100.111",
        longitude = "555.222",
        descriptionVolcano = "Описание вулкана...";

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

} // Отбражение информации о вулкане во всплывающем окне

function selectAllVolcanoes(totalVolcanoes) {
    for (var i = 1; i < totalVolcanoes; i++) {
        selectVolcanoe(i);
    }
    
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
    divListVolcanoes.innerHTML += '<div class="row row-flex">' +
                                       '<div class="col-xs-9">' +
                                           '<li id="' + volcanoesArrId[i] + '" class="green list-group-item">' + item + '</li>' +
                                       '</div>' +
                                       '<div class="col-xs-3">' +
                                           '<button type="button" class="btn btn-block btn-height100" onclick="showDescriptionVolcano(' +
                                                   volcanoesArrId[i] + ')">Описание</button>' +
                                       '</div>' +
                                       '<div class="margin2px clearfix"></div>' +
                                  '</div>';
});
divListVolcanoes.innerHTML += '</ul>';
