package com.example.springbootbackend.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.springbootbackend.Test.RunShellScript;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;
import com.example.springbootbackend.services.SubmissionService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.netty.handler.codec.socksx.SocksPortUnificationServerHandler;
import javafx.util.Pair;

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
    public ResponseEntity<List<Pair<String, String>>> submitFile(@RequestParam(name="file", required=false) MultipartFile file, @RequestParam("sourceCode") String code, @RequestParam("fileType") String fileType, @RequestParam("testcase") String testcaseJson){

        System.out.println(file);
        if (file == null && code.equals("")){
            List<Pair<String, String>> resultArray = new ArrayList<>();
            return new ResponseEntity<>(resultArray, HttpStatus.BAD_REQUEST);
        }
        
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            List<List<String>> testcase = objectMapper.readValue(testcaseJson, new TypeReference<List<List<String>>>() {});
            
            System.out.println("At submission controller! Going to submission service " + testcase);
            return submissionService.submitFile(file, code, fileType, testcase);

        }catch(IOException e){
            e.printStackTrace(); // You might want to log the exception
            List<Pair<String, String>> resultArray = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultArray);
        }

    }

}
