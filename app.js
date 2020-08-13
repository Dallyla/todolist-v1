const express = require("express");
const bodyParser = require("body-parser");

const app = express();


let items = ["Buy Food", "Cook Food", "Eat Food"];


app.use(bodyParser.urlencoded({extended: true})); //activates body-parser

app.set('view engine', 'ejs'); //diz ao app para usar o ejs como view engine com o express

app.get("/", function(req, res){


    let today = new Date();   //standard object JS

    let options = {
        weekday : "long",
        day : "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newListItems : items
    }); //passing the day value to ejs file and rendering the response to the browser

    
});

app.post("/", function(req,res) {

    let item = req.body.newItem;  //grab the value of newItem
    items.push(item);             // push the item to the end of the array 
    
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});