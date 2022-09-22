# Fetch node 16 image from docker hub bullseye-debian 11 slim-smaller image
FROM node:16-bullseye-slim as builder
# Set Working directory
WORKDIR /app
# Copy the complete code base into the /app
COPY . .
# Download and install dependencies
RUN npm install
# Build the Hack Ideas app
RUN npm run build
# nginx apline web server image
FROM nginx:stable-alpine
# Upgrade the dependent packages of nginx container
RUN apk -U upgrade
# Copy from builder app to nginx
COPY --from=builder /app/build /usr/share/nginx/html/
# Expose Port 80
EXPOSE 80