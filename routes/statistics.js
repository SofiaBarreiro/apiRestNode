
const { Router } = require('express');

const router = Router();


router.get('/statistics', (req, res) => {

    res.send('estadisticas');
});



module.exports = router;