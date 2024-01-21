package com.example.springbootbackend.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        System.out.println("Adding testcases...");
        return testcasesRepo.save(testcase);
        // return questionId + " " + testcase;
    }

    @GetMapping("/get-testcases")
    public List<TestCases> getTestCases(){
        // return "Connected Bro!";
        System.out.println("Getting testcases...");
        return testcasesRepo.findAll();
    } 


    @GetMapping("/get-testcase-by-id/{id}")
    public Optional<TestCases> getTestCaseByQuestionId(@PathVariable String id){
        // return "Connected Bro!";
        System.out.println("Question Id: " + id);
        return testcasesRepo.findByQuestionId(id);
    } 

}
