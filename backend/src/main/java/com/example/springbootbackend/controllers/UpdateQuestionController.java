package com.example.springbootbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.Question;
import com.example.springbootbackend.database.QuestionRepo;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UpdateQuestionController {
    
    @Autowired
    private QuestionRepo questionRepo;

    @PutMapping("/update-question-by-id/{questionId}")
    public Question updateQuestionById(@PathVariable String questionId, @RequestBody Question question) {
        
        // A workaround
        // First check if question Id exists or not
        
        questionRepo.deleteByQuestionId(questionId);
        return questionRepo.save(question);
        
        // return questionRepo.updateQuestionByQuestionId(questionId, question);
    }
}
