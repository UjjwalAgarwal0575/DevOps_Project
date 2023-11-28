package com.example.springbootbackend.services;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.springbootbackend.Test.RunShellScript;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;
import com.example.springbootbackend.database.UserRepoImpl;

import java.util.Optional;

public class SubmissionService {

    private RunShellScript runShellScript = new RunShellScript();
    
    public ResponseEntity<String> submitFile(@RequestParam("file") MultipartFile file){

        try{
            byte[] fileBytes = file.getBytes();
            // String fileContent = new String(fileBytes);

            
            UserRepoImpl userRepoImpl = new UserRepoImpl(null);

            checkMongoDBConnectivity(userRepoImpl);

            runShellScript.execute(file);
            return new ResponseEntity<>("Processed File", HttpStatus.OK);
        
        } catch(IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Error processing the file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public static void checkMongoDBConnectivity(UserRepoImpl userService) {
        try {
            // Create a sample user
            User newUser = new User();
            newUser.setId("1");
            newUser.setUsername("john_doe");

            // Save the user to MongoDB
            userService.createUser(newUser);
            Optional<User> savedUser = userService.getUserById("1"); 
            System.out.println("User created with ID: " + savedUser);

            // // Retrieve the user by ID
            // String userId = savedUser.getId();
            // System.out.println("Retrieving user by ID: " + userId);
            // userService.getUserById(userId).ifPresent(System.out::println);

            // // List all users
            // System.out.println("Listing all users:");
            // userService.getAllUsers().forEach(System.out::println);

            // // Update the user
            // savedUser.setEmail("john.doe.updated@example.com");
            // userService.updateUser(savedUser);

            // // Delete the user
            // System.out.println("Deleting user by ID: " + userId);
            // userService.deleteUser(userId);

            // // List all users after deletion
            // System.out.println("Listing all users after deletion:");
            // userService.getAllUsers().forEach(System.out::println);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error checking MongoDB connectivity: " + e.getMessage());
        }
    }

}
