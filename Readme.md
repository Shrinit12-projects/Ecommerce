docker run -p 9000:9000 -p 9090:9090 \
  -e "MINIO_ROOT_USER=admin" \
  -e "MINIO_ROOT_PASSWORD=admin123" \
  -v "C:\Users\shrin\minio-data:/data" \
  minio/minio server /data --console-address ":9090"
