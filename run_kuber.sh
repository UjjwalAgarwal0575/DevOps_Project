#!/bin/bash

minikube start
eval $(minikube -p minikube docker-env)

minikube addons enable metrics-server
minikube dashboard &

minikube kubectl -- apply -f frontend-deployment.yaml,frontend-tcp-service.yaml,my-network-networkpolicy.yaml,rabbitmq-deployment.yaml,rabbitmq-service.yaml,redis-server-deployment.yaml,redis-server-service.yaml,sender-deployment.yaml,sender-service.yaml,worker-deployment.yaml,worker-service.yaml

kubectl port-forward service/sender 8082:8082 &
kubectl port-forward service/worker 8081:8081 &

kubectl get services | grep frontend-tcp | awk 'BEGIN {print "Frontend IP:"}{print $4 ":3000"}'
