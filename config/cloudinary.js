const cloudinary = require('cloudinary');
const dotenv = require("dotenv");
dotenv.config();
// const {CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = ;


let cloud = cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// const uploads = cloudinary.uploader.upload(req.file.path).than((result) => {
//     const image = result.url;
//     return image;
// })



module.exports = {cloud}