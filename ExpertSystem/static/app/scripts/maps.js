function selectVolcanoe(objectId) { 
    var strId = '#' + objectId; //строка с id элемента в списке вулканов
    //Если id вулкана отсутствует в массиве, то выделяем вершину, элемент в списке цветом и добавляем id в массив
    if (selectedVolcanoes.indexOf(objectId) == -1) {
        selectedVolcanoes.push(objectId); // Добавление id вулкана в массив
        $(strId).removeClass('green'); // Удаление класса элемента списка
        $(strId).addClass('yellow'); // Добавление класса элемента списка
        // Метод setObjectOptions позволяет задавать опции объекта "на лету".
        objectManager.objects.setObjectOptions(objectId, {
            preset: 'islands#yellowDotIcon'
        });
        console.log(selectedVolcanoes);
        // иначе удаляем вершину и возвращаем исходный цвет
    } else {
        selectedVolcanoes.splice(selectedVolcanoes.indexOf(objectId), 1); // Удаление id вулкана из массива
        $(strId).removeClass('yellow');
        $(strId).addClass('green');
        objectManager.objects.setObjectOptions(objectId, {
            preset: 'islands#greenDotIcon'
        });
        console.log(selectedVolcanoes);
    }

} // Функция изменяет цвет метки на карте, цвет фона элемента списка и добавляет id вулкана в массив

var myMap;
var selectedVolcanoes = new Array();
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [54.608908, 158.607702], // Координаты центра карты
        zoom: 6, // Степень увеличения
        controls: ['zoomControl', 'typeSelector'], // Список стандартных элементов управления
        type: 'yandex#satellite' // Установка типа карты, yandex#satellite - спутник
    }, {
            searchControlProvider: 'yandex#search'
        }),

        homeButton = new ymaps.control.Button({
            data: {
                // Задание имени, центра карты, зума для кнопки.
                content: "Вернуться",
                center: [54.608908, 158.607702],
                zoom: 6
            },
            options: {
                selectOnClick: false // Эффект "зажатия кнопки"
            }
        });

        homeButton.events.add('click', function (e) {
            // Установка центра карты и зума
            myMap.setCenter(
                homeButton.data.get('center'),
                homeButton.data.get('zoom')
                    );
        });
        // Добавление кнопки на карту
        myMap.controls.add(homeButton);

        /*myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier']); // Отключение перемещения карты ЛКМ и ПКМ*/

        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: false,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true
        });

        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        myMap.geoObjects.add(objectManager);
        // Загрузка данных о метках из JSON-файла
        $.ajax({
            url: "http://localhost:8000/static/app/scripts/data.json"
        }).done(function (data) {
            objectManager.add(data);
        });
    
        function onObjectEvent(e) {
            var objectId = e.get('objectId');
            if (e.get('type') == 'click') {
                selectVolcanoe(objectId); // Функция изменяет цвет метки на карте, цвет фона элемента списка и добавляет id вулкана в массив
            } 
        }

        objectManager.objects.events.add(['click'], onObjectEvent);
        
        document.body.addEventListener("click", function (event) {
            if (event.target.nodeName == "LI") {
                var objectId = parseInt(event.target.id);
                selectVolcanoe(objectId); // Функция изменяет цвет метки на карте, цвет фона элемента списка и добавляет id вулкана в массив
            }
        });


}
