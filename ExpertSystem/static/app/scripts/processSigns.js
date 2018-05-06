var arrSignsInfo = new Array(),
    selectedSigns = new Array(),
    visible = false,
    selectAllSignsFromGroupSpecialParam = "onlyOff";

$.ajax({
    url: "http://localhost:8000/get_info_sign/",
    datatype: "application/json"
}).done(function (data) {
    arrSignsInfo = data;
    createListSigns(arrSignsInfo);
});


function createListSigns(arrSignsInfo) {
    $("#list-groups-and-signs").html(function () {
        var content = "",
            idGroup = 0;
        content += '<h4 class="margin-top-off margin-bottom-off padding-bottom5px">Выберите признаки из списка</h4>' + 
                   '<ul class="list-group">';

        for (group in arrSignsInfo) {
            content += '<div id="list-group" class="row row-flex height45_6 padding-bottom5px">' +
                            '<div class="col-xs-9">' +
                                '<li id="group-' + idGroup + '" class="green list-group-item">&equiv; ' + group + '</li>' +
                            '</div>' +
                            '<div class="col-xs-3">' +
                '<button type="button" class="btn btn-default btn-block btn-height100"' +
                    ' onclick=\'selectAllSignsFromGroup("' + group + '", ' + idGroup + ')\'>Выбрать все из группы</button>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                       '</div>' +
                            '<div id="list-signs-' + idGroup + '" class="row row-flex hidden">' +
                                '<div class="col-xs-1"></div>' +
                                '<div class="col-xs-8">' +
                                    '<ul class="list-group">';
            for (key in arrSignsInfo[group]) {
                for (sign in arrSignsInfo[group][key]) {
                    content +=          '<li id="sign-' + arrSignsInfo[group][key][sign] + '" class="green list-group-item margin2px">' + sign + '</li>';
                }
            }
            content +=              '</ul>' + 
                                '</div>' + 
                                '<div class="clearfix"></div>' + 
                            '</div>';
            idGroup++;
        };

        content += '</ul>';
        return content;
    });
} // Формирование списка признаков

function selectAllSigns(special) {
    numberGroup = 0;
    for (group in arrSignsInfo) {
        for (key in arrSignsInfo[group]) {
            for (sign in arrSignsInfo[group][key]) {
                selectSign("sign-" + arrSignsInfo[group][key][sign], -1, special);
            }
        }
        if (special == "onlyOn") {
            $("#group-" + numberGroup).removeClass('green');
            $("#group-" + numberGroup).addClass('yellow');
        } else if (special == "onlyOff") {
            $("#group-" + numberGroup).removeClass('yellow');
            $("#group-" + numberGroup).addClass('green');
        }
        numberGroup++;
    }

} // Выбор или удалнение всех признаков из массива

function selectAllSignsFromGroup(group, idGroup) {
    if (selectAllSignsFromGroupSpecialParam == "onlyOn") selectAllSignsFromGroupSpecialParam = "onlyOff";
    else selectAllSignsFromGroupSpecialParam = "onlyOn";

    if (isAllSignsInGroupOnOrOff(group, true)) selectAllSignsFromGroupSpecialParam = "onlyOff";
    else if (isAllSignsInGroupOnOrOff(group, false)) selectAllSignsFromGroupSpecialParam = "onlyOn";

    for (key in arrSignsInfo[group]) {
        for (sign in arrSignsInfo[group][key]) {
            selectSign("sign-" + arrSignsInfo[group][key][sign], idGroup, selectAllSignsFromGroupSpecialParam)
        }
    }
} // Выбор или удалнение всех признаков определенной группы из массива

function isAllSignsInGroupOnOrOff(group, isOn) {
    if (group != "undefined") {
        for (key in arrSignsInfo[group]) {
            for (sign in arrSignsInfo[group][key]) {
                // Выбор режима поиска: isOn = true - проверка на присутствие, isOn = false - проверка на отсутствие
                if (isOn) {
                    if (selectedSigns.indexOf(arrSignsInfo[group][key][sign]) == -1) return false; // Если отсутствует хотя бы один признак, возврат FALSE
                } else {
                    if (selectedSigns.indexOf(arrSignsInfo[group][key][sign]) != -1) return false; // Если присутствует хотя бы один признак, возврат FALSE
                }
            }
        }
    }
    return true;
} // Проверка на присутствие или отсутствие всех признаков группы в общем массиве

function selectSign(signId, numberGroup, special) {
    var signId = '#' + signId, //строка с id элемента в списке вулканов
        signIdNumber = Number(signId.replace(/\D+/g, "")),
        count = 0;
    // Поиск названия группы по номеру
    if (numberGroup > -1) {
        for (groupLocal in arrSignsInfo) {
            if (count == numberGroup) break;
            count++;
        }
    } else groupLocal = "undefined";
    // Если передан параметр "onlyOn", то признак не может быть удалена из массива, несмотря на еего присутствие (функция selectAllSings)
    if ((special == "onlyOn") || (special == "")) {
        //Если id признака отсутствует в массиве, то выделяем признак в списке цветом и добавляем id в массив
        if ((selectedSigns.indexOf(signIdNumber) == -1)) {
            selectedSigns.push(signIdNumber); // Добавление id(только числовое значение) признака в массив
            $(signId).removeClass('green'); // Удаление класса элемента списка
            $(signId).addClass('yellow'); // Добавление класса элемента списка

            // Включение подсветки группы, если все элементы в ней выбраны
            if (isAllSignsInGroupOnOrOff(groupLocal, true)) {
                $("#group-" + numberGroup).removeClass('green');
                $("#group-" + numberGroup).addClass('yellow');
            }
            return 0;
        }
    }
    // Если передан параметр "onlyOff", то признак не может быть добавлена в массив, несмотря на ее отсутствие (функция selectAllSings)
    if ((special == "onlyOff") || (special == "")) {
        // Удаляем признак и возвращаем исходный цвет
        if (selectedSigns.indexOf(signIdNumber) != -1) {
            selectedSigns.splice(selectedSigns.indexOf(signIdNumber), 1); // Удаление id вулкана из массива
            $(signId).removeClass('yellow');
            $(signId).addClass('green');

            // Отключение подсветки группы, если все элементы в ней выбраны
            if (isAllSignsInGroupOnOrOff(groupLocal, false)) {
                $("#group-" + numberGroup).removeClass('yellow');
                $("#group-" + numberGroup).addClass('green');
            }
            return 0;
        }
    }

} // Функция изменяет цвет фона элемента списка и добавляет/удаляет id признака из массива

function sendResultAndPageMaps() {
    serializeSelectedSigns = JSON.stringify(selectedSigns);
    sessionStorage.setItem('serializeSelectedSigns', serializeSelectedSigns);
    location.href = '/maps';
} // Передача json объекта через сессионное хранилище и переход на страницу выбора вулканов

document.body.addEventListener("click", function (event) {
    if (event.target.nodeName == "LI") {
        var objectId = event.target.id;
        // Раскрытие или скрытие списка признаков группы
        if (objectId.substr(0, 6) == "group-") {
            if (!visible) {
                $("#list-signs-" + objectId.substring(6)).removeClass('hidden');
                visible = true;
            } else if (visible) {
                $("#list-signs-" + objectId.substring(6)).addClass('hidden');
                visible = false;
            }
            // Добавление или удаление вершины из общего массива
        } else if (objectId.substr(0, 5) == "sign-") {
            //$("div:regex(class, .group-signs-*)")
            idListGroup = $("#" + objectId).parent().parent().parent().attr('id'); // list-group-#, где # - номер группы
            numberGroup = Number(idListGroup.replace(/\D+/g, ""));
            selectSign(objectId, numberGroup, "");
        }
    }
});