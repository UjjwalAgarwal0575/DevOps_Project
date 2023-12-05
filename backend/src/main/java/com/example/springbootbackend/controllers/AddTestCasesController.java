package com.example.springbootbackend.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.TestCases;
import com.example.springbootbackend.database.TestCasesRepo;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AddTestCasesController {
    
    @Autowired
    private TestCasesRepo testcasesRepo;

    @PostMapping("/add-testcases")
    public TestCases saveTestCases(@RequestBody TestCases testcase){
        // TestCases testcases = new TestCases(questionId, testcase);
        return testcasesRepo.save(testcase);
        // return questionId + " " + testcase;
    }

    @GetMapping("/get-testcases")
    public List<TestCases> getTestCases(){
        // return "Connected Bro!";
        return testcasesRepo.findAll();
    } 


    private static void convertStringToJsonFile(String jsonString, String outputPath) {
        try {
            // Create ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Convert JSON string to Java object (in this case, a Map)
            Object jsonMap = objectMapper.readValue(jsonString, Object.class);

            // Write Java object to JSON file
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(outputPath), jsonMap);

            System.out.println("JSON file created successfully: " + outputPath);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
