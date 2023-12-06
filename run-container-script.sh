#!/bin/bash

# Remove existing containers
docker rm -f backend-container mongo-container
docker rm -f frontend-container 


# Remove existing images
docker rmi frontend
docker rmi backend

# Run MongoDB container
docker run -d --network=devops_project_my-network --name=mongo-container -v /home/amar/Documents/Sem7/SPE/DevOps_Project/data:/data/db  -p 27017:27017 mongo

cd backend 
mvn clean install
cd ..

# Build frontend and backend images
docker build -t frontend ./frontend/
docker build -t backend ./backend/

# Run Docker Compose
docker-compose up
