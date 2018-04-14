
$.ajax({
    url: "http://localhost:8000/get_info_sign/"
}).done(function (data) {
    createListSigns(data);
});


function createListSigns(arrSignsInfo) {
    $("#first-half-signs").html(function () {
        var content = "",
            idGroup = 1;
        content += '<h4 class="margin-top-off margin-bottom-off padding-bottom5px">Выберите признаки из списка</h4>' + 
                   '<ul class="list-group">';

        arrSignsInfo.forEach(function (item, i, arr) {
            content += '<div class="row row-flex height45_6 padding-bottom5px">' +
                '<div class="col-xs-9">' +
                '<li id="group-' + idGroup + '" class="green list-group-item dropdown-toggle">&equiv; ' + item[2] + '</li>' +
                '<div class="row row-flex">' +
                '<div id="div-group-' + idGroup + '" class="col-xs-12"></div>' + 
                '<ul class="dropdown-menu"><li>dwadwad</li><li>asdfgh</li><li>zxcvbb</li></ul>'
                '</div>' + 
                '</div>' +
                '<div class="col-xs-3">' +
                '<button type="button" class="btn btn-default btn-block btn-height100" onclick="">Выбрать все из группы</button>' +
                '</div>' +
                '<div class="clearfix"></div>' +
                '</div>';
            idGroup++;
        });

        content += '</ul>';
        return content;
    });
    /*$("#first-half-signs").html(function () {
        var content = "";
        content += '<h4 class="margin-top-off margin-bottom-off padding-bottom5px">Выберите признаки из первой половины списка</h4>' +
            '<div class="row row-flex padding-bottom5px">' +
            '<div class="col-xs-12 text-center">' +
            '<div class="btn-group btn-group-justified padding-bottom5px">' +
            '<a href="#" class="btn btn-primary" style="margin-right: 5px" onclick="">Выбрать все признаки</a>' +
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
    });*/
} // Формирование списка признаков