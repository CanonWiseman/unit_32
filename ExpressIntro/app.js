const express = require('express');
const ExpressError = require('./ExpressError');
const expressError = require('./ExpressError')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res, next){
    try{
        if(Object.keys(req.query).length == 0){
            throw new ExpressError("Nums are required", 400)
        }
    }catch(err){
        return next(err);
    } 
    
    let nums = req.query.nums
    nums = nums.split(",")
    ints = [];
    
    for(let num of nums){
        try{
            if(isNaN(parseInt(num))){
                throw new ExpressError("query string contained a non number", 400)
            }
            ints.push(parseInt(num))
        }catch(err){
            return next(err);
        } 
    }

    const initialValue = 0;

    sum = ints.reduce(
        (acc, curr) => acc + curr,
        initialValue
    );
    
    const response = {
        'response':
        {
            'operation': 'mean',
            'value': sum / ints.length
        }
    }
    return res.json(response)
});

app.get('/median', function(req, res, next){
    try{
        if(Object.keys(req.query).length == 0){
            throw new ExpressError("Nums are required", 400)
        }
    }catch(err){
        return next(err);
    } 
    let nums = req.query.nums
    nums = nums.split(",")
    ints = [];
    let response;
    for(let num of nums){
        try{
            if(isNaN(parseInt(num))){
                throw new ExpressError("query string contained a non number", 400)
            }
            ints.push(parseInt(num))
        }catch(err){
            return next(err);
        } 
    }
    
    const middleIndex = (Math.floor(ints.length / 2))
    
    if(ints.length % 2 != 0){
        response = {
            'response':
            {
                'operation': 'median',
                'value': ints[middleIndex]
            }
        }
    }
    else{
        response = {
            'response':
            {
                'operation': 'median',
                'value': (ints[middleIndex] + ints[middleIndex -1]) / 2
            }
        }
    }
    return res.json(response)
});

app.get('/mode', function(req, res, next){
    try{
        if(Object.keys(req.query).length == 0){
            throw new ExpressError("Nums are required", 400)
        }
    }catch(err){
        return next(err);
    } 
    let nums = req.query.nums
    nums = nums.split(",")
    ints = [];
    let highestFreq = 0;
    let highestFreqNums = [];
    
    for(let num of nums){
        try{
            if(isNaN(parseInt(num))){
                throw new ExpressError("query string contained a non number", 400)
            }
            ints.push(parseInt(num))
        }catch(err){
            return next(err);
        } 
    }

    counts = {}
    ints.forEach(function(e) {
    if(counts[e] === undefined) {
        counts[e] = 0
    }
    counts[e] += 1
    })
    
    for (const [key, value] of Object.entries(counts)) {
        if(value > highestFreq){
            highestFreqNums = [];
            highestFreq = value;
            highestFreqNums.push(key);
        }
        else if(value == highestFreq){
            highestFreqNums.push(key);
        }
    }

    if(highestFreq == 1){
        highestFreqNums = "No mode for this dataset"
    }

    const response = {
        'response': {
            'operation': 'mode',
            'value(s)': highestFreqNums
        }
    }

    return res.send(response)
});

app.use(function(err, req, res, next){
    // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

app.listen(3000, function(){
    console.log("app is running on port 3000")
});