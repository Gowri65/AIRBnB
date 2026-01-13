let express = require("express");
let mongoose = require("mongoose");
let method_Override = require("method-override");
let ejsMate = require("ejs-mate");
let path = require("path");
let app = express();
app.use(method_Override("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate);
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
.then(()=>{
    console.log("Mongodb connection started");
})
.catch((err)=>{
    console.log(err);
})
let Listing = require("./models/listing.js");
app.listen(8080,()=>{
    console.log("server started");
})
app.get("/",(req,res)=>{
    res.send("Hey! I am root.");
})
//Index Route
app.get("/listings",async (req,res)=>{
let allListings = await Listing.find({});
res.render("listings/index.ejs",{allListings});
})
//New Route
app.get("/listings/new", (req,res)=>{
res.render("listings/new.ejs");
})
//Edit Route
app.get("/listings/edit/:id", async(req,res)=>{
    let {id} = req.params;
    let onelist = await Listing.findById(id);
res.render("listings/edit.ejs",{onelist});
})
//Show Route
app.get("/listings/:id",async (req,res)=>{
let {id} = req.params;
let onelist = await Listing.findById(id);
res.render("listings/show.ejs",{onelist});
})
//Create Route
app.post("/listings",async (req,res)=>{
let listing = req.body.listing;
console.log(listing);
let newlist = new Listing({...listing});
await newlist.save();
console.log("newlist saved");
res.redirect("/listings");
})
//Update Route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let {listing} = req.body;
    await Listing.findByIdAndUpdate(id,{...listing});
    console.log("list updated");
    res.redirect(`/listings/${id}`);
})
//Destroy Route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let {listing} = req.body;
    await Listing.findByIdAndDelete(id,{...listing});
    console.log("list Deleted");
    res.redirect(`/listings`);
})











// app.get("/list",async ()=>{
// let samplelisting = new Listing({
//     title : "My new villa",
//     description : "By the beach",
//     price : 4200,
//     location : "Goa",
//     country : "India"
// })
// await samplelisting.save();
// console.log("added");
// })