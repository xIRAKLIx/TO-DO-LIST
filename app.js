const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res) {

    var today = new Date();
    
    
    if(today.getDay() ===6 || today.getDay()===0) {
    res.send('Today Is Weekend')
    }
    else {
        res.send ('We Have To Work')
    }
});

app.listen(3000, function() {
    console.log ('Server Is Running On Port 3000')
})
