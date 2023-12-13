pipeline {
    environment {
        docker_image = ""
    }
    agent any
    stages {
        stage('Stage 0: Creating Mongo Container')
        {
            steps{
                sh 'docker rm -f mongo-container'
                sh 'docker run --name mongo-container --network=deployment_my-network -v /home/amar/Documents/Sem7/SPE/DevOps_Project/data:/data/db -p 27017:27017 -d mongo'
            }
        }
        stage('Stage 1: Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/UjjwalAgarwal0575/DevOps_Project.git'
            }
        }
        // Add more stages as needed
        stage('Step 2: Maven Build'){
                steps{
                   dir('backend') {
                        // sh 'ls -l'
                        // Uncomment the line below when you want to run Maven clean install
                        sh 'mvn clean install'
                    }
                }
        }
        stage('Stage 3: Build Docker Image'){
                steps{
                    dir('backend')
                    {
                        script{
                            docker_image = docker.build "ujjwalagarwal0575/backend-image:latest"
                        }
                    }
                    dir('frontend')
                    {
                        script{
                            docker_image = docker.build "ujjwalagarwal0575/frontend-image:latest"
                        }
                    }
                }
        }
        
        stage('Stage 4: Push docker image to hub') {
                steps{
                    script{
                        docker.withRegistry('', 'DockerHubCred'){
                            // docker_image.push()
                            sh 'docker push ujjwalagarwal0575/frontend-image:latest'
                            sh 'docker push ujjwalagarwal0575/backend-image:latest'
                        }
                    }
                }
        }
        
        stage('Stage 5: Clean docker images'){
                steps{
                    script{
                        sh 'docker container prune -f'
                        sh 'docker image prune -f'
                    }   
                }
        }
        stage('Step 6: Ansible Deployment'){
                steps{
                    ansiblePlaybook becomeUser: null,
                    colorized: true,
                    credentialsId: 'localhost',
                    disableHostKeyChecking: true,
                    installation: 'Ansible',
                    inventory: 'deployment/inventory',
                    playbook: 'deployment/deploy.yml',
                    sudoUser: null
                }
        }
    }
}