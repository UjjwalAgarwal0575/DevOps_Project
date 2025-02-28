## Minikube
Minikube is an application that sets up a local Kubernetes cluster on the system. 

To start Minikube
```
minikube start
```

To stop Minikube
```
minikube stop
```

To delete Minikube
```
minikube delete
```

To enable Kubernetes dashboard metrics:
```
minikube addons enable metrics-server
```

## Docker
To build a Docker image
```
docker build -t image_name .
```
To run a Docker container:
```
docker run -d -p host_port:container_port image_name
```
To list running Docker containers:
```
docker ps
```

To remove a Docker container:
```
docker rm container_id
```
To push a Docker image to a repository:
```
docker push repository/image_name
```

## Kubernetes
To apply Kubernetes configurations:
```
kubectl apply -f config.yaml
```
To get the status of Kubernetes pods:
```
kubectl get pods
```
To describe a specific Kubernetes pod:
```
kubectl describe pod pod_name
```
To scale a Kubernetes deployment:
```
kubectl scale --replicas=3 deployment_name
```
To delete Kubernetes resources:
```
kubectl delete -f config.yaml
```

## Kubernetes HPA (Horizontal Pod Autoscaler)
To autoscale a deployment based on CPU utilization:
```
kubectl autoscale deployment <deployment-name> \
--cpu-percent=<cpu-threshold> \
--min=<min_no_of_replicas> \
--max=<max_no_of_replicas>
```

To check the status of the autoscaled deployment:
```
kubectl get hpa
```
