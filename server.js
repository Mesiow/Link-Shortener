const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
var bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
//use ejs views
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));


//Routes

//Url list route
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find({});
    res.render("index", {shortUrls: shortUrls});
});


app.get("/newUrl", (req, res) => {
    res.render("newUrl");
});


app.post("/", async (req, res) => {
    await ShortUrl.create({base: req.body.url});
    res.redirect("/");
});


const port = process.env.PORT || 4000;
app.listen(port, function(){
    console.log("Server Started On Port " + port);
});