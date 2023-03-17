const express = require('express');
const list = require('./fakeDb')
const router = new express.Router();

router.get('/', (req, res) => {
    res.send(list)
})
module.exports = router