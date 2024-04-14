# Use an official OpenJDK runtime as a parent image
FROM openjdk:17.0.1-jdk-slim
RUN apt-get update && apt install -y g++ 
# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file to the working directory
ADD target/worker-0.0.1-SNAPSHOT.jar /app/app.jar
COPY src/main/java/com/example/worker/Test/execute.sh /app/src/main/java/com/example/worker/Test/execute.sh
COPY src/main/java/com/example/worker/Test/createExecutable.sh /app/src/main/java/com/example/worker/Test/createExecutable.sh

# Expose port 8081
EXPOSE 8081

# Run the application
CMD ["java", "-jar", "./app.jar"]
