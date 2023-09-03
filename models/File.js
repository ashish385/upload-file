const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});


// post middlewale

fileSchema.post("save", async function (doc) {
    try {
        console.log("doc", doc);
        
        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        // send mail
        let info = await transporter.sendMail({
            from:"Ashish",
            to:doc.email,
            subject:" File uploaded on Cloudinary",
            html:`<h2>Hello ji</h2><p>File uploaded </p>`
        })

        console.log("info",info);
    } catch (error) {
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;