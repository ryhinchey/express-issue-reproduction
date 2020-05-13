const express = require("express");
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/country/:country/:province?', function(req,res){
  console.log(req.url)
  var data = {
    "country": {
        "country": req.params.country,
        "province": req.params.province 
    }
  }; 

  console.log(data);
  res.render("country", data);
});


app.listen(3000);