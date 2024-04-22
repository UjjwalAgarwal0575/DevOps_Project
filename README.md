# DevOps_Project

To use cloud MongoDB instead of mongo container, we made a few changes:

1) Added connection `uri` to `application.yml` file.
2) Removed localhost, port field from `application.properties` file.
3) After this, we were getting an error of "Empty Database name". In `uri` itself, there used to be a placeholder for 'database_name', but now, since it's not there, we will add manually, a field in `application.yml` file named "database: testdb".

## Requirements
docker
docker-compose
minikube
kubectl

## Instructions to run

### Docker-compose

chmod +x run_compose.sh 
./run_compose.sh

### Kubernetes

chmod +x run_kuber.sh
./run_kuber.sh

