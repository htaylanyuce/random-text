var mongoose = require("mongoose");
 
 
var Schema = new mongoose.Schema({
     textInput: String,
     id: {
         type: mongoose.Schema.Types.ObjectId,
          
     },
    
});
 

var Texts = mongoose.model("Texts", Schema);



module.exports = Texts;