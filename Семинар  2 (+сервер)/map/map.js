// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
    // Создание карты.
    myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.8009332,37.5266524],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15,
        controls: ['zoomControl', 'typeSelector', 'geolocationControl']  // routeButtonControl - кнопка для построения маршрута
    });
}

function change_mode(mode) {
    let button = document.getElementById(mode);
    button.className = 'btn_mode_active'
}

function makeRoute() { // Построение маршрута.
// По умолчанию строится автомобильный маршрут.
    let pointFrom = document.getElementById('address_1').value
    let pointTo = document.getElementById('address_2').value
    let routingMode = document.getElementsByClassName('btn_mode_active')

    if (pointFrom === '' || pointTo === '') {
        alert('Заполните поля')
    } else {
        myRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [pointFrom, pointTo],
            params: {
                routingMode: routingMode,
                avoidTrafficJams: true
            }
        }, {
            boundsAutoApply: true,  // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            routeActiveStrokeWidth: 10,
            routeActiveStrokeStyle: 'solid',
            routeActiveStrokeColor: '#2bccbf'
        });

// Добавление маршрута на карту.
        myMap.geoObjects.add(myRoute);
    }
}

function clearMap() {
    myMap.geoObjects.removeAll();
    myRoute && myMap.geoObjects.remove(myRoute);
}