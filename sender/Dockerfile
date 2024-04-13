# Use an official OpenJDK runtime as a parent image
FROM openjdk:17.0.1-jdk-slim
# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file to the working directory
ADD target/springboot-backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose port 8082
EXPOSE 8082

# Run the application
CMD ["java", "-jar", "./app.jar"]
