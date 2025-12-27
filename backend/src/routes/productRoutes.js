const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.json({httpMethond: 'get'});
})

router.post('/', (req,res) => {
    res.json({httpMethond: 'post'});
})

router.put('/', (req,res) => {
    res.json({httpMethond: 'put'});
})

router.delete('/', (req,res) => {
    res.json({httpMethond: 'delete'});
})

module.exports = router;