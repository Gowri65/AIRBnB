let mongoose = require("mongoose");
let listingSchema = new mongoose.Schema({
title : {
type : String,
required : true
},
description : {
type : String,
required : true
},
image : {
type : Object,
default : "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
set : (v)=> v === ""?"https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
},
price : {
type : Number,
required : true
},
location : {
type : String,
required : true
},
country : {
type : String,
required : true
}
})
let Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;