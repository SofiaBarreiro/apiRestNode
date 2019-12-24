function traerPersonas() {

    xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/traer?collection=statistics";
    xhr.open('GET', url, true);
    xhr.onreadystatechange = manejadorRespuesta;
    xhr.send();
  }