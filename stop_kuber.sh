#!/bin/bash

minikube stop
export DOCKER_TLS_VERIFY=""
export DOCKER_HOST=""
export DOCKER_CERT_PATH=""
export MINIKUBE_ACTIVE_DOCKERD=""
