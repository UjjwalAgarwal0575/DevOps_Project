# Use an official OpenJDK runtime as a parent image
FROM openjdk:17

# Set the working directory in the container
# WORKDIR /usr/src/app

# Copy the application JAR file to the working directory
COPY target/springboot-backend-0.0.1-SNAPSHOT.jar .

# Expose port 8082
EXPOSE 8082

# Run the application
CMD ["java", "-jar", "springboot-backend-0.0.1-SNAPSHOT.jar"]