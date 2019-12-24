
const express = require('express');
const _ = require('underscore');
var bodyParser = require('body-parser');

const router = express();
const statistics = require('../statistics/statistics.json');

router.use(express.static(__dirname));
router.use(express.static(__dirname, {index: 'index.html'}))

router.use(bodyParser.json());
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/traer', (req, res) => {

    var url = require('url');
    var parts = url.parse(req.url, true);
    var query = parts.query;
    console.log(url);

    require('fs').readFile(__dirname + getPathFromCollection(query.collection), 'utf8', function (err, data) {
        console.log(data);
        var array = JSON.parse(data);
        array = array.filter(function(a){
          return a.active == true || a.active == "true";
        });
        var response = {
             message: "Carga exitosa",
             "data":array
        }
        setTimeout(function(){res.send(response);},5000);

    });
    // res.json(statistics);
    // res.send(statistics);
    // console.log(statistics);

});

// router.post('/statistics', (req, res) => {

//     const { IP, Color, Seconds } = req.body;

//     if (IP && Color && Seconds) {
//         const id = statistics.length + 1;
//         const newStatistic = { ...req.body, id };
//         statistics.push(newStatistic);
//         res.json(statistics);

//     } else {

//         res.status(500).json({ error: "error" });
//         res.send('peticion erronea');
//     }
//     console.log(req.body);
//     res.send('recibido');

// });

// router.delete('/statistics/:Id', (req, res) => {

//     const { Id } = req.params;
//     _.each(statistics, (statistic, i) => {

//         if (statistic.Id == Id) {
//             statistics.splice(i, 1);
//         }
//     });
//     res.json(statistics);
// });


function getPathFromCollection(collection){
    if(collection==="statistics"){
        return '\\statistics\\statistics.json';
    }

}

module.exports = router;