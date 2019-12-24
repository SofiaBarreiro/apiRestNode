
const { Router } = require('express');
const _ = require('underscore');

const router = Router();


const statistics = require('../statistics/statistics.json');


router.get('/statistics', (req, res) => {

    res.json(statistics);

});

router.post('/statistics', (req, res) => {

    const { IP, Color, Seconds } = req.body;

    if (IP && Color && Seconds) {
        const id = statistics.length + 1;
        const newStatistic = {...req.body, id };
        statistics.push(newStatistic);
        res.json(statistics);

    } else {

        res.status(500).json({error : "error"});
        res.send('peticion erronea');
    }
    console.log(req.body);
    res.send('recibido');

});

router.delete('/statistics/:Id', (req, res) =>{

    const { Id } = req.params;
    _.each(statistics, (statistic, i)=>{

        if(statistic.Id == Id){
            statistics.splice(i,1);
        }
    });
    res.json(statistics);
});


module.exports = router;