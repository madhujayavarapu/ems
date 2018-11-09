const express = require('express');
const router = express.Router();

router.post('/addCompany', (req, res, next) => {
    res.redirect('/company/addCompany',req,body);
})

module.exports = router;