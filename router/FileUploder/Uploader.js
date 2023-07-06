const cloudinary = require("./cloudinary");


const UploadFile = async(filepath, filetype) => {
    try {
        
        const upload = await cloudinary.v2.uploader.upload(filepath, { 
            resource_type: filetype,
            chunk_size : 40000000 
        });

        return upload.secure_url;

    } catch (error) {
        
    }
}

const DeleteFile = async (filepath, filetype) => {
    console.log(filepath, filetype);
    var arr = filepath.split('/')
    var token = arr[arr.length - 1].split('.')[0]
    console.log(token);
    try {
        cloudinary.v2.uploader.destroy(
            token, 
            {resource_type : filetype}
        ).then(result=>console.log(result));

        return "deleted successfully";

    } catch (error) {
        
    }
}



module.exports = {UploadFile, DeleteFile}
