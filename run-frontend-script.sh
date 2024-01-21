#!/bin/bash

# Remove existing containers
docker rm -f frontend-container 


# Remove existing images
docker rmi frontend

# Build frontend and backend images
docker build -t frontend ./frontend/

docker run -d --network=my-network --name=frontend-container -p 3000:3000 frontend

