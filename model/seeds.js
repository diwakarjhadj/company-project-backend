const mongoose = require("mongoose");

const InitialdatabaseSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
});

const InitializeDatabase = mongoose.model('InitializeDatabase', InitialdatabaseSchema);

module.exports=InitializeDatabase;