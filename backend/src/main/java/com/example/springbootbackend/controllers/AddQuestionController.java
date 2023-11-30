package com.example.springbootbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.Question;
import com.example.springbootbackend.database.QuestionRepo;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AddQuestionController {
    
    @Autowired
    private QuestionRepo questionRepo;

    @GetMapping("/")
    public ResponseEntity<String> hello(){
        return new ResponseEntity<>("Connected!", HttpStatus.OK);
    }

    @PostMapping("/add-question")
    public Question saveQuestion(@RequestBody Question question){
        return questionRepo.save(question);
    }

    @GetMapping("/get-questions")
    public List<Question> getQuestions(){
        return questionRepo.findAll();
    }

}
