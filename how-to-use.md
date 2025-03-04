Here's how you can get started:

## Folder structure
Let's get through the folder structure of the project in brief.
<img width="501" alt="folderStructure" src="https://github.com/user-attachments/assets/58078005-1fae-4dc7-b29b-549c35ae990d" />

Shown above is the root level folder structure without concerning about details. In the above image, following files can be seen:

### Deployment Files

#### 1. frontend-deployment.yaml
Kubernetes configuration for deploying the frontend application.
#### 2. frontend-tcp-service.yaml
Defines the TCP service for the frontend in Kubernetes.
#### 3. my-network-networkpolicy.yaml
Specifies network policies for controlling traffic within the Kubernetes cluster.
#### 4. rabbitmq-deployment.yaml
Deployment configuration for RabbitMQ.
#### 5. rabbitmq-service.yaml
Service configuration to expose RabbitMQ to the cluster or external systems.
#### 6. redis-server-deployment.yaml
Deployment configuration for the Redis server.
#### 7. redis-server-service-deployment.yaml
Service configuration for the Redis server to enable connectivity.
#### 8. sender-deployment.yaml
Kubernetes deployment file for the sender component.
#### 9. sender-service.yaml
Service configuration to expose the sender component.
#### 10. worker-deployment.yaml
Deployment configuration for the worker component.
#### 11. worker-service.yaml
Service configuration to expose the worker component.

## Frontend
Contains the React application, created using the `npx create-react-app` command. It includes all the necessary files and structure for the frontend application.

## Worker and Sender
These are Spring Boot applications generated using Spring Initializr. Each folder includes the typical structure of a Spring Boot project, such as `src`, `resources`, and `pom.xml`.


## Other files
#### 1. run_compose.sh
Script to start services using Docker Compose.
#### 2. run_kuber.sh 
Script to start services in a Kubernetes environment.
#### 3. stop_compose.sh 
Script to stop services running via Docker Compose.
#### 4. stop_kuber.sh 
Script to stop services running in a Kubernetes environment.
