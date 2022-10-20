import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT,
    DB_URL,
    JWT_SERVICE,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;