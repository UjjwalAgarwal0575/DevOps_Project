package com.example.springbootbackend.components;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
// @RequiredArgsConstructor
// @CrossOrigin
public class SubmissionController {
    
    @PostMapping("/submit-file")
    public ResponseEntity<String> submitFile(@RequestParam("file") MultipartFile file){

        if (file.isEmpty()){
            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
        }

        try{

            byte[] fileBytes = file.getBytes();
            String fileContent = new String(fileBytes);

            return new ResponseEntity<>("Processed File", HttpStatus.OK);

        } catch(IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Error processing the file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}