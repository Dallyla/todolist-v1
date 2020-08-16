const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


app.use(bodyParser.urlencoded({extended: true})); //activates body-parser

app.use(express.static("public"));

app.set('view engine', 'ejs'); //diz ao app para usar o ejs como view engine com o express


//Root route
app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems : items
    }); //passing the day value to ejs file and rendering the response to the browser

    
});

app.post("/", function(req,res) { 

    const item = req.body.newItem;  //grab the value of newItem

    if(req.body.list === "Work") {        
        workItems.push(item);        // push the item to the end of the array workItems
        res.redirect("/work");
        
    } else {
        items.push(item);            // push the item to the end of the array items
        res.redirect("/"); 
    }
    
});


//work route
app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

//about route

app.get("/about", function(req,res) {
    res.render("about");
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});