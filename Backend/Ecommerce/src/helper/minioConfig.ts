import { Client } from "minio";
import dotenv from "dotenv";
dotenv.config();





// 🔹 MinIO Configuration
const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY_ID,
  secretKey: process.env.S3_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = "products";

// Ensure the bucket exists
(async () => {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
  }
})();

export const uploadFileToMinio = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${Date.now()}-${file.originalname}`;
  
  await minioClient.putObject(BUCKET_NAME, fileName, file.buffer);
  
  return `http://localhost:9000/${BUCKET_NAME}/${fileName}`;
};