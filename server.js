var express = require('express');
var app = express();
var http = require('http').Server(app);
var morgan = require('morgan');
app.set('port',3000);

// var io = require('socket.io')(http);

// app.use(express.static(__dirname));
app.use(express.static(__dirname, { index: 'index.html' }));
app.use(express.urlencoded({ extended: false }));


http.listen(3000, function () {
    console.log('listening on *:3000');
});


app.use(morgan('dev'));

app.use(express.json());


//agregando las rutas


app.use(require('./routes/index'));
app.use(require('./routes/statistics'));


//starting the server
//

// app.listen(app.get('port'), ()=>{

//    console.log("funcionando server.js");

// });



// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//routes





app.post('/agregar', function (req, res) {
    var collection = req.body.collection;
    var nuevoObjeto = req.body.objeto;

        require('fs').readFile(__dirname + getPathFromCollection(collection), 'utf8', function (err, data) {
            if (err) {
                 throw err; // error handling
            }else{
                // console.log(data);
                array = JSON.parse(data);
                // nuevoObjeto.id = getID(array);
                // nuevoObjeto.active = "true";
                // nuevoObjeto.created_dttm = new Date().toLocaleString();
                array.push(nuevoObjeto);
                require('fs').writeFileSync(__dirname + getPathFromCollection(collection), JSON.stringify(array));
                //build response
                var response = {
                    message: "Alta exitosa",
                }
                setTimeout(function(){res.send(response);    },5000);
            }

        });

});


function getPathFromCollection(collection){
    if(collection==="personas"){
        return '\\statistics\\statistics.json';
    }
}


// function getID(array){
//     if(array.length == 0){
//         return 1;
//     }
//     else if(array.length == 1){
//         return 2;
//     }
//     else{
//         var maxIndex = array.reduce(function(prev,curr,index){
//             if(prev.id>curr.id)
//             return prev.id;
//             else
//             return curr.id;
//         });
//         return maxIndex+1;
//     }
// }


