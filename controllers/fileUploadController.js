const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

// local file upload = > handler function

exports.localFileUpload = async (req, res) => {
    // const { name, email, tags, imageUrl } = req.body;
    try {
        // fetch file from request
        const file = req.files.file;
        console.log("File => ", file);
        
        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path => ",path); 

        // add path to move function
        file.mv(path, (err) => {
            console.log(err);
        })

        // create successful response
        res.json({
            success: true,
            message:"Local fiile uploaded successfully",
        })
    } catch (error) {
        console.log(error);
    }
}

// check extension
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// upload file to cloudinary
async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
    console.log("temp fole upload", file.tempFilePath);
    if (quality) {
        options.quality = quality;
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, options)
    console.log("result",result); 
    return result;
   
    
}

// Image upload ka handler
exports.imageUpload = async (req, res) => {
    console.log(req.body);
    try {
        const { name, tags, email,imageUrl } = req.body;
        console.log(name, tags, email );
        const file = req.files.imageFile;
        console.log("file", file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filetype=> ",fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message:"File format not supported!"
            })
        }

        //  file format supported hai
        let response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // // db me entry save
        const filedata = await File.create({
            name,email,tags,imageUrl:response.secure_url
        })
        res.json({
            success: true,
            imageUrl:response.secure_url,
            message:"image successful uploaded"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"somthing went wrong"
        })
    }
}

exports.vidoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log("file ", file);
        
        // validation
        const supportedTypes = ["mp4", "mkv"];
        const fileType = await file.name.split(".")[1].toLowerCase();
        console.log("filetype ", fileType);
        
        // check file format
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.json({
                success: false,
                message:"Invalid file"
            })
        }
        console.log("shi hai");

        // file format supported hai
        const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'video',folder:"Codehelp" });
        console.log(result);

        // db me entry save
        const filedata = await File.create({name,email,tags,videoFile:result.secure_url})
        
        res.json({
            success: true,
            videoFile:result.secure_url,
            message:"file uploaded"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"somthing went wrong"
        })
    }
}

// image size reduce
exports.imageSizeReducer = async (req, res) => {
     try {
        const { name, tags, email,imageUrl } = req.body;
        console.log(name, tags, email );
        const file = req.files.imageFile;
        console.log("file", file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filetype=> ",fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message:"File format not supported!"
            })
        }

        //  file format supported hai
        let response = await uploadFileToCloudinary(file, "Codehelp",90); /* 90 use for image size reduce */
        console.log(response);

        // // db me entry save
        const filedata = await File.create({
            name,email,tags,imageUrl:response.secure_url
        })
        res.json({
            success: true,
            imageUrl:response.secure_url,
            message:"image successful uploaded"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"somthing went wrong"
        })
    }

}