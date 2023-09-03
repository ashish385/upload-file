
// app connect
const express = require("express")
const app = express();

// port find
require("dotenv").config();
const PORT = process.env.PORT || 4000


// middleware add
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// DB connect
const db = require("./config/database");
db.connect();


// cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


// api route mount
const upload = require("./routes/fileUploadRouter");
app.use("/api/v1/upload",upload)

// activate server
app.listen(PORT, () => {
    console.log(`server started on port no ${PORT} `);
})