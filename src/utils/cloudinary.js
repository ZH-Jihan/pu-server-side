import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
cloudinary.config({ 
  cloud_name: 'dgctadcb2', 
  api_key: '936925187356185', 
  api_secret: 'exvP0bLFbHBkfgyzC38T1cYYq9k' 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null;

        const result = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});

        fs.unlinkSync(localFilePath)
        return result
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}

export { uploadOnCloudinary };
