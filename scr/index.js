$(document).ready(function () {

    var statePage = true;
    console.log("ready!");
    initialCount = 60;
    numberSeccion = $("#numberSeccion");
    numberSeccion.text(initialCount);
    var asignColor = 'White';
    boton = $('#buttonMeter');
    var clicks = 0;
    setMetre();
    newUser = null;
    ipUser = null;
    $.getJSON("https://api.ipify.org?format=json",
        function (data) {

            ipUser = data.ip;
        })
    boton.click(function () {

        if (statePage == true) {
            clearInterval(interval);
            boton.prop("disabled", true);
            asignColor = setColor(initialCount);
            console.log(asignColor);
            clicks++;
            traerPersonas();
            // newUser = createNewStatistics(ipUser, initialCount+1, asignColor);
            // storeUser(newUser);

        }
    });
    simulator();




});

function setMetre() {
    interval = window.setInterval(function () {
        numberSeccion.text(initialCount);
        initialCount--;
    }, 1000);


}

function simulator() {

    var second = Math.floor(Math.random() * (60000 - 1000 + 1) + 1000);
    var stopCount = 61 - (second / 1000) + 1;
    stopCount = parseInt(stopCount);
    console.log("la cuenta va a frenar en: " + stopCount);
    window.setInterval(function () {
        boton.click();
    }, second);


}


function setColor(second) {
    var asignColor = 'White';

    if (second <= 60 && second >= 52) {
        asignColor = 'Purple';
    } else if (second <= 51 && second >= 42) {
        asignColor = 'Blue';
    } else if (second <= 41 && second >= 32) {
        asignColor = 'Green';
    } else if (second <= 31 && second >= 22) {
        asignColor = 'Yellow';
    } else if (second <= 21 && second >= 12) {
        asignColor = 'Orange';
    } else if (second <= 11 && second >= 0) {
        asignColor = 'Red';
    } else {
        asignColor = 'Grey';
    }
    return asignColor;

}


function createNewStatistics(id, time, color) {
    var newStadistic = new Object();
    newStadistic.id = id;
    newStadistic.time = time;
    newStadistic.color = color;
    return newStadistic;

}




// function storeUser(user) {

//     xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = manejadorRespuesta2;
//     var url = "http://localhost:3000/agregar";
//     xhr.open('POST', url, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     var body = { 'collection': 'usuarios', 'objet': user };
//     xhr.send(JSON.stringify(body));

// }


function manejadorRespuesta2() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var arrayPersonas = JSON.parse(xhr.responseText);
            lista = arrayPersonas.data;
            console.log(xhr.status + 'respuesta');
        }
    }
}

function manejadorRespuesta() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var arrayPersonas = JSON.parse(xhr.responseText);

            lista = arrayPersonas.data;

            console.log(lista);
            // armarTabla(lista);

        }
    }


}


