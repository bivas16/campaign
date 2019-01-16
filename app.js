var bodyparser = require("body-parser");
var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}));
//mongoose.connect('mongodb://localhost:27017/campaign_db', { useNewUrlParser: true });
mongoose.connect('mongodb://bivas:coldplay16@ds259154.mlab.com:59154/campaign_db', { useNewUrlParser: true });


var campaignschema = new mongoose.Schema({
    title: String,
    description: String,
    board: String,
    image: String,
    website: String,
    pplparticipation: Number,
    pins: Number,
    startdate: Date,
    enddate: Date,
    category: String,
    followers: Number,
});

var Campaign = mongoose.model("Campaign", campaignschema);

app.get("/", function(req,res){
   res.redirect("/campaigns") ;
});

//INDEX ROUTE
app.get("/campaigns", function(req,res){
    Campaign.find({}, function(err, campaigns){
        if(err){
            res.send(err);
        }
        else{
            res.render("index.ejs", {campaigns: campaigns})
        }
    });
});

//NEW ROUTE
app.get("/campaigns/new", function(req,res){
    res.render("newcampaign.ejs");
});

//CREATE ROUTE
app.post("/campaigns", function(req,res){
   Campaign.create(req.body.campaign, function(err, newcampaign){
      if(err){
          res.send("Error" + err);
      } 
      else{
          res.redirect("/campaigns");
      }
   });
});

//SHOW ROUTE
app.get("/campaigns/:id", function(req,res){
   Campaign.findById(req.params.id, function(err, foundcampaign){
      if(err){
          res.send(err);
      } 
      else{
          res.render("show.ejs", {campaign: foundcampaign});
      }
   });
    
});

     

app.listen(process.env.PORT , process.env.IP, function(){
   console.log("server started"); 
});

