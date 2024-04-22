#!/bin/bash

docker rm -vf $(docker ps -aqf name=worker)
docker rm -vf $(docker ps -aqf name=sender)
docker rm -vf $(docker ps -aqf name=frontend)
docker rmi -f worker
docker rmi -f sender
docker rmi -f frontend

minikube start
eval $(minikube -p minikube docker-env)

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

minikube dashboard &
minikube tunnel --rootless &

kubectl apply -f frontend-deployment.yaml,frontend-tcp-service.yaml,my-network-networkpolicy.yaml,rabbitmq-deployment.yaml,rabbitmq-service.yaml,redis-server-deployment.yaml,redis-server-service.yaml,sender-deployment.yaml,sender-service.yaml,worker-deployment.yaml,worker-service.yaml

kubectl port-forward service/sender 8082:8082 &
kubectl port-forward service/worker 8081:8081 &

kubectl get services | grep frontend-tcp | awk 'BEGIN {print "Frontend IP:"}{print $4 ":3000"}'
