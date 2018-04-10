
function getSigns() {
    $.ajax({
        url: "http://localhost:8000/get_info_sign/"
    }).done(function (data) {
        console.log(data);
    });
}

getSigns();