var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var path = require('path');
//var Texts = require("./models/texts");

var random = require('mongoose-random');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/myTexts');
mongoose.Promise = global.Promise;
 
var s = new mongoose.Schema({
    textInput: String,
         id: {
             type: mongoose.Schema.Types.ObjectId,
              
            },
    
});
s.plugin(random);
 
var Texts = mongoose.model("Texts", s);

 
app.get("/index",function(req,res){
    
    Texts.findRandom({}, {}, {count: 4}, function(err, texts) {
 
        if(err)
        {
            console.log(err);
         }
        else
        {    
            res.render("index",{texts:texts});
        }
    });
});


app.post("/index",function(req,res){
    var textInput = req.body.textInput;
     Texts.create({textInput:textInput},function(err,small){
        if(err) console.log(err);
        else
            res.redirect("/index");
    });
});
    

app.get("*",function(req,res){
    res.redirect("/index");
});


app.listen(process.env.PORT, process.env.IP, function(){
 });


