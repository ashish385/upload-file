const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
        .then(console.log("Database connection successfully!"))
        .catch((err) => {
        console.log("Database issue");
            console.error(err);
            process.exit(1);
    })
}