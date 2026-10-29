# Build from the SITE ROOT (the folder that contains index.html and server/):
#   docker build -f server/Dockerfile -t dmp-workbook .
#   docker run -p 8080:8080 -v dmp-data:/app/server/data dmp-workbook
FROM node:20-alpine
WORKDIR /app
COPY . .
ENV PORT=8080
EXPOSE 8080
VOLUME ["/app/server/data"]
CMD ["node", "server/server.js"]
