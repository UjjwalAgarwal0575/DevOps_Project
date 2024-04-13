package com.example.springbootbackend.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

// import javax.xml.crypto.dsig.keyinfo.KeyValue;

import com.example.springbootbackend.Test.RunShellScript;
import com.example.springbootbackend.database.KeyValue;
import com.example.springbootbackend.database.ProblemSubmitted;
import com.example.springbootbackend.database.SubmissionData;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;
import com.example.springbootbackend.services.SubmissionService;
import com.example.springbootbackend.services.RedisService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.amqp.rabbit.core.RabbitTemplate;

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
    
    @Autowired
    private RabbitTemplate template;

    @Autowired
    private RedisService redisService;

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
    public ResponseEntity<List<Pair<String, String>>> submitFile(@RequestParam(name="file", required=false) MultipartFile file, @RequestParam("sourceCode") String code, @RequestParam("fileType") String fileType, @RequestParam("testcase") String testcase){

        System.out.println(file);
        if (file == null && code.equals("")){
            List<Pair<String, String>> resultArray = new ArrayList<>();
            return new ResponseEntity<>(resultArray, HttpStatus.BAD_REQUEST);
        }

        String fileContent = "";
        if (file != null){
            try{
                InputStream inputStream = file.getInputStream();
                byte[] bytes = inputStream.readAllBytes();
                fileContent = new String(bytes, StandardCharsets.UTF_8);
            }
            catch(IOException e){
                e.printStackTrace();
            }
        }
        
        // convert file content to String

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            redisService.setValue("Submission ID", "QUEUED");
            String response = addtoQueue(fileContent, code, fileType, testcase);
            KeyValue[] result = objectMapper.readValue(response, KeyValue[].class);
            
            List<Pair<String, String>> resultArray = new ArrayList<>();
            for (KeyValue keyValue : result) {
                String key = keyValue.getKey();
                String value = keyValue.getValue();
                Pair<String, String> pair = new Pair<>(key, value);
                resultArray.add(pair);
            }

            return ResponseEntity.status(HttpStatus.OK).body(resultArray);
            
        }catch(IOException e){
            e.printStackTrace(); // You might want to log the exception
            List<Pair<String, String>> resultArray = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultArray);
        }
        
    }

    private String addtoQueue(@RequestParam(name="file", required=false) String file, @RequestParam("sourceCode") String code, @RequestParam("fileType") String fileType, @RequestParam("testcase") String testcase )
    {
        SubmissionData submissionData = new SubmissionData(file, code, fileType, testcase);
        String response = (String) template.convertSendAndReceive("message_exchange", "routing_key", submissionData);
        return response;
    }

    @GetMapping("get-update")
    public String getUpdateRedis()
    {
        return redisService.getValue("Submission ID");
    }
}
