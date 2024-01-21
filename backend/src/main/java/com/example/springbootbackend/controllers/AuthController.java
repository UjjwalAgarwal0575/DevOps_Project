package com.example.springbootbackend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserRepo userRepo;

    @PostMapping("/sign-in")
    public ResponseEntity<String> signInUser(@RequestBody User user) {
        String emailId = user.getEmailId();
        Optional<User> optionalUser = userRepo.findByEmailId(emailId);
        if (optionalUser.isPresent()) {
            User u = optionalUser.get();
            if (u.getPassword().equals(user.getPassword())) {
                System.out.println("logged in succesfully.");
                return ResponseEntity.status(HttpStatus.OK).body("User registered successfully!");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Credentials!");
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUpUser(@RequestBody User user) {
        
        if (userRepo.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Username is already taken!");
        }

        if (userRepo.existsByEmailId(user.getEmailId())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email Id is already in use!");
        }
        userRepo.save(user);

        return ResponseEntity.status(HttpStatus.OK).body("User registered successfully!");
    }

}
