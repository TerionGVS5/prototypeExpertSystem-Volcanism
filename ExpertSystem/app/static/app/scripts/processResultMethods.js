
var taskId = sessionStorage.getItem("taskId");

function createResult(headerName, arrClusters) {
    $("#result-method").html(function () {
        var content = "";
        content += '<h2 class="text-center page-header">' + headerName + '</h2>' +
                   '<ul class="list-group">';
        for (cluster in arrClusters) {
            content += '<li class="list-group-item margin2px">Кластер ' + cluster + '</li>' +
                           '<div class="row row-flex">' +
                               '<div class="col-xs-1"></div>' +
                               '<div class="col-xs-11">' +
                                  '<ul class="list-group">';
            for (volcano in arrClusters[cluster]) {
                content +=           '<li class="list-group-item margin2px">' + volcano + '</li>'
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