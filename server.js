const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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
//override with post having ?_method=DELETE
app.use(methodOverride('_method'));


//Routes

//Url list route
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find({}); //find all short url models
    res.render("index", {shortUrls: shortUrls});
});

//new url form route
app.get("/newUrl", (req, res) => {
    res.render("newUrl");
});

//add short url route
app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({base: req.body.url});
    res.redirect("/");
});

//short url match
app.get("/:shortUrl", async (req, res) => {
    //find short url based on url param
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl});
    if(!shortUrl) //url not found
        return res.sendStatus(404);

    shortUrl.visits++;
    shortUrl.save();

    //redirect to original url
    res.redirect(shortUrl.base);
});

//url delete route
app.delete("/:shortUrl", async (req, res) => {
    await ShortUrl.deleteOne({short: req.params.shortUrl}, (err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});




const port = process.env.PORT || 4000;
app.listen(port, function(){
    console.log("Server Started On Port " + port);
});