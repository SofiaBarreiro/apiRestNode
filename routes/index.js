const { Router } = require('express');
const router = Router();


router.get('/test', (req, res)=>{

    const data = {

        "IP": "123",
        "Color": "white",
        "Seconds": "23"

    }
    res.json(data);

    console.log('hello world');
});


router.get('/statistics', (req, res)=>{

    const data = {

        "IP": "123",
        "Color": "white",
        "Seconds": "23"

    }
    res.json(data);

    console.log('hello world');
});



module.exports = router;