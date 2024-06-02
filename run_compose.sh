#!/bin/bash

docker rm -vf $(docker ps -aqf name=worker)
docker rm -vf $(docker ps -aqf name=sender)
docker rm -vf $(docker ps -aqf name=frontend)
docker rmi -f worker
docker rmi -f sender
docker rmi -f frontend

cd sender
mvn clean install
docker build --tag 'sender' .
cd ..

cd worker
mvn clean install
docker build --tag 'worker' .
cd ..

cd frontend
npm install
docker build --tag 'frontend' .
cd ..

docker compose up -d
