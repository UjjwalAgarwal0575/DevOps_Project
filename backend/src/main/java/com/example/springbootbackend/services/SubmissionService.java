package com.example.springbootbackend.services;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.springbootbackend.Test.RunShellScript;

public class SubmissionService {

    private RunShellScript runShellScript = new RunShellScript();
    
    public ResponseEntity<String> submitFile(@RequestParam("file") MultipartFile file){

        try{
            byte[] fileBytes = file.getBytes();
            // String fileContent = new String(fileBytes);
            runShellScript.execute(file);
            return new ResponseEntity<>("Processed File", HttpStatus.OK);
        
        } catch(IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Error processing the file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
