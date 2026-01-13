let mongoose = require("mongoose");
let samplelisting = require("./data.js"); // its an object which contains a key called data
// and that key stores the array object which contains data
let Listing = require("../models/listing.js");
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
async function initdb() {
    await Listing.deleteMany({});
    await Listing.insertMany(samplelisting.data);
    console.log("added data!");
}
initdb();