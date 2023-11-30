package com.example.springbootbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.TestCases;
import com.example.springbootbackend.database.TestCasesRepo;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AddTestCasesController {
    
    @Autowired
    private TestCasesRepo testcasesRepo;

    @PostMapping("/add-testcases")
    public TestCases saveTestCases(TestCases testcases){
        return testcasesRepo.save(testcases);
    }

    @GetMapping("/get-testcases")
    public List<TestCases> getTestCases(){
        return testcasesRepo.findAll();
    } 
}
