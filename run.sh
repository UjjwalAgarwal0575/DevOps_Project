#!/bin/bash

docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)

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

docker-compose up
