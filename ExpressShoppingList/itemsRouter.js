const express = require('express');
const list = require('./fakeDb')
const router = new express.Router();

router.get('/', (req, res) => {
    res.json(list);
});

router.post('/', (req, res) => {
    let returnedItems = [];
    for(item of req.body){
        list.push(item);
    }
    let response = {}
    response.added = req.body;
    res.json(response);
});

router.get('/:name', (req, res) => {
    let item = list.find(i => i.name.toLowerCase()=== req.params.name.toLowerCase());
    console.log(item);
    
    res.json(item)
});

router.patch('/:name', (req, res) =>{
    let item = list.find((i, j) => {
        if (i.name.toLowerCase() === req.params.name.toLowerCase()) {
            list[j] = req.body;
            return true;
        }
    });

    let response = {}
    response.Updated = req.body

    res.json(response);
});

router.delete('/:name', (req, res) =>{
    let item = list.find((i, j) => {
        if (i.name.toLowerCase() === req.params.name.toLowerCase()) {
            delete list[j];
            return true;
        }
    });
    response = {"message": "Deleted"}
    
    res.json(response);
});
module.exports = router

