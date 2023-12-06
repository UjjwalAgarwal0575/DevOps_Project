package com.example.springbootbackend.controllers;

import java.io.IOException;
import java.util.List;

import com.example.springbootbackend.Test.RunShellScript;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;
import com.example.springbootbackend.services.SubmissionService;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


// import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
// @RequiredArgsConstructor
@CrossOrigin
public class SubmissionController {
    
    private SubmissionService submissionService = new SubmissionService();

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/post-data")
    public User saveUser(@RequestBody User user){
        System.out.println(user);
        return userRepo.save(user);
    }
    

    @GetMapping("/get-data")
    public List<User> getUsers(){
        return userRepo.findAll();
    }


    @GetMapping("/")
    public ResponseEntity<String> hello(){
        return new ResponseEntity<>("Connected!", HttpStatus.OK);
    }

    @PostMapping("/submit-file")
    public ResponseEntity<String> submitFile(@RequestParam("file") MultipartFile file, @RequestParam("questionId") String questionId){

        if (file.isEmpty()){
            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
        }

        System.out.println("At submission controller! Going to submission service " + questionId);
        return submissionService.submitFile(file, questionId);
    }

}
