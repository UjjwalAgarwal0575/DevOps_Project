package com.example.springbootbackend.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springbootbackend.Test.RunShellScript;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;

import java.util.List;
import java.util.Optional;

@RestController
public class SubmissionService {

    private RunShellScript runShellScript = new RunShellScript();

    public ResponseEntity<String> submitFile(@RequestParam("file") MultipartFile file, @RequestParam("questionId") String questionId){

        try{
            System.out.println("At submission service! Going to RubShellScript : " + questionId);
            byte[] fileBytes = file.getBytes();
            // String fileContent = new String(fileBytes);

            runShellScript.execute(file, questionId);
            return new ResponseEntity<>("Processed File", HttpStatus.OK);
        
        } catch(IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Error processing the file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
