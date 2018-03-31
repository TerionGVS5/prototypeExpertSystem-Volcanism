var myMap;
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [54.608908, 158.607702],
        zoom: 6
    }, {
            searchControlProvider: 'yandex#search'
        }),

        myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier']);

        /////////////////////////////////////TEST//////////////////////////////////
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
    
        /*function onObjectEvent(e) {
            var objectId = e.get('objectId');
            if (e.get('type') == 'mouseenter') {
                // Метод setObjectOptions позволяет задавать опции объекта "на лету".
                objectManager.objects.setObjectOptions(objectId, {
                    preset: 'islands#yellowDotIcon'
                });
            } else {
                objectManager.objects.setObjectOptions(objectId, {
                    preset: 'islands#greenDotIcon'
                });
            }
        }*/

        function onObjectEvent(e) {
            var objectId = e.get('objectId');
            if (e.get('type') == 'click') {
                // Метод setObjectOptions позволяет задавать опции объекта "на лету".
                objectManager.objects.setObjectOptions(objectId, {
                    preset: 'islands#yellowDotIcon'
                });
            } /*else {
                objectManager.objects.setObjectOptions(objectId, {
                    preset: 'islands#greenDotIcon'
                });
            }*/
        }

        function qwe(e) {

        }

        objectManager.objects.events.add(['click'], onObjectEvent);
        //objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
        /////////////////////////////////////TESTEND//////////////////////////////////

        /*

        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.8, 37.8]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Я тащусь',
                hintContent: 'Ну давай уже тащи'
            }
        }, {
                // Опции.
                // Иконка метки будет растягиваться под размер ее содержимого.
                preset: 'islands#blackStretchyIcon',
                // Метку можно перемещать.
                draggable: true
            }),
        myPieChart = new ymaps.Placemark([
            55.847, 37.6
        ], {
                // Данные для построения диаграммы.
                data: [
                    { weight: 8, color: '#0E4779' },
                    { weight: 6, color: '#1E98FF' },
                    { weight: 4, color: '#82CDFF' }
                ],
                iconCaption: "Диаграмма"
            }, {
                // Зададим произвольный макет метки.
                iconLayout: 'default#pieChart',
                // Радиус диаграммы в пикселях.
                iconPieChartRadius: 30,
                // Радиус центральной части макета.
                iconPieChartCoreRadius: 10,
                // Стиль заливки центральной части.
                iconPieChartCoreFillStyle: '#ffffff',
                // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeStyle: '#ffffff',
                // Ширина линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeWidth: 3,
                // Максимальная ширина подписи метки.
                iconPieChartCaptionMaxWidth: 200
            });

    myMap.geoObjects
        .add(myGeoObject)
        .add(myPieChart)
        .add(new ymaps.Placemark([55.684758, 37.738521], {
            balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
        }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }))
        .add(new ymaps.Placemark([55.833436, 37.715175], {
            balloonContent: '<strong>серобуромалиновый</strong> цвет'
        }, {
                preset: 'islands#dotIcon',
                iconColor: '#735184'
            }))
        .add(new ymaps.Placemark([55.687086, 37.529789], {
            balloonContent: 'цвет <strong>влюбленной жабы</strong>'
        }, {
                preset: 'islands#circleIcon',
                iconColor: '#3caa3c'
            }))
        .add(new ymaps.Placemark([55.782392, 37.614924], {
            balloonContent: 'цвет <strong>детской неожиданности</strong>'
        }, {
                preset: 'islands#circleDotIcon',
                iconColor: 'yellow'
            }))
        .add(new ymaps.Placemark([55.642063, 37.656123], {
            balloonContent: 'цвет <strong>красный</strong>'
        }, {
                preset: 'islands#redSportIcon'
            }))
        .add(new ymaps.Placemark([55.826479, 37.487208], {
            balloonContent: 'цвет <strong>фэйсбука</strong>'
        }, {
                preset: 'islands#governmentCircleIcon',
                iconColor: '#3b5998'
            }))
        .add(new ymaps.Placemark([56.26, 160.34], {
            balloonContent: 'цвет <strong>носика Гены</strong>',
            iconCaption: 'Харчинский, Заречный'
        }, {
                preset: 'islands#greenDotIconWithCaption'
            }))
        .add(new ymaps.Placemark([55.790139, 37.814052], {
            balloonContent: 'цвет <strong>голубой</strong>',
            iconCaption: 'Очень длиннный, но невероятно интересный текст'
        }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '50'
            }));
    */
}
