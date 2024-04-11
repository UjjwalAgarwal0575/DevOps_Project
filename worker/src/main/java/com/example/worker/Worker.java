package com.example.worker;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.example.worker.Test.RunShellScript;
import com.example.worker.model.ProblemSubmitted;
import com.example.worker.model.SubmissionData;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

import javafx.util.Pair;


@Component
public class Worker {
    RunShellScript runShellScript = new RunShellScript(); 

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private Queue responseQueue; // Define response queue
    
    @RabbitListener(queues = "message_queue")
    public String listener(SubmissionData submissionData) {
        
        List<List<String>> testcase = null;

        String fileContent = submissionData.getFile();
        String code = submissionData.getCode();
        String fileType = submissionData.getFileType();
        String testcaseJson = submissionData.getTestcase();

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            testcase = objectMapper.readValue(testcaseJson, new TypeReference<List<List<String>>>() {});
        }
        catch(IOException e){
            e.printStackTrace();
        }

        System.out.println(fileContent);
        System.out.println(code);
        System.out.println(fileType);
        System.out.println(testcase);

        List<Pair<String, String>> result = runShellScript.execute(fileContent, code, fileType, testcase);
        String resultData = "";

       
        for (Pair<String, String> pair : result) {
            String key = pair.getKey();
            String value = pair.getValue();
            
            // Process key and value as needed
            System.out.println("Key: " + key + ", Value: " + value);
        }

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            resultData = objectMapper.writeValueAsString(result);

            System.out.println(resultData);
        }
        catch(IOException e){
            e.printStackTrace();
        }

        return resultData;
        // Convert result to JSON if necessary
        // String resultJson = /* Convert result to JSON */;

        // Publish the result to response queue
    }
}
