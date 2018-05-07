
var taskId = sessionStorage.getItem("taskId");

function createResult(headerName, arrClusters) {
    $("#result-method").html(function () {
        var content = "";
        content += '<h2 class="text-center page-header">' + headerName + '</h2>' +
            '<p>Среди выбранных вулканов выделено ' + arrClusters.length +
                   ' кластер(-а, -ов). Вулканы, включенные в кластер, имеют внутреннюю схожесть по выбранным атрибутам.</p>' +
                   '<ul class="list-group">';
        for (cluster in arrClusters) {
            content += '<li class="list-group-item margin2px">Кластер ' + (parseInt(cluster, 10)+1) + '</li>' +
                           '<div class="row row-flex">' +
                               '<div class="col-xs-1"></div>' +
                               '<div class="col-xs-11">' +
                                  '<ul class="list-group">';
            for (numVolcano in arrClusters[cluster]) {
                content +=            '<li class="list-group-item margin2px">' + arrClusters[cluster][numVolcano] + '</li>';
            }
            content +=            '</ul>' +
                               '</div>' + 
                           '</div>';
        }
        content += '</ul>';
        return content;
    });
}


switch (taskId) {
    case '1':
        arrClusters = JSON.parse(sessionStorage.getItem("arrClustersOneGraph"));
        console.log(arrClusters);
        createResult("Результат работы метода односвязного графа", arrClusters);
        break;
    case '2':
        arrClusters = JSON.parse(sessionStorage.getItem("arrClustersMasks"));
        createResult("Результат работы метода масок", arrClusters);
        break;
    default:
        alert("Невозможно получить id метода. Попробуйте повторить попытку.");
        break;
}