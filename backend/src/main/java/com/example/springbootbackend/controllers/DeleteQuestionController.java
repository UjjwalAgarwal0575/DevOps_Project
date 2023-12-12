package com.example.springbootbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.QuestionRepo;
import com.example.springbootbackend.database.TestCasesRepo;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class DeleteQuestionController {
    
    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private TestCasesRepo testcasesRepo;

    @DeleteMapping("/delete-question/{questionId}")
    public void deleteDocumentById(@PathVariable String questionId){
        questionRepo.deleteByQuestionId(questionId);
        testcasesRepo.deleteByQuestionId(questionId);
    }

}
