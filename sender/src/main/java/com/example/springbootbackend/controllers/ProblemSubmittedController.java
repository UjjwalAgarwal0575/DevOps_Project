package com.example.springbootbackend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.ProblemSubmitted;
import com.example.springbootbackend.database.ProblemSubmittedRepo;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProblemSubmittedController {
    
    @Autowired
    private ProblemSubmittedRepo problemSubmittedRepo;

    @PostMapping("/add-submission")
    public ProblemSubmitted addSubmission(@RequestBody ProblemSubmitted problemSubmitted){
        return problemSubmittedRepo.save(problemSubmitted);
        // System.out.println("Added submission!");
    }

    @GetMapping("/get-submissions")
    public List<ProblemSubmitted> getSubmissions(){
        return problemSubmittedRepo.findAll();
    }

    @GetMapping("/get-submissions-user-id")
    public List<ProblemSubmitted> getSubmissionsByUserId(@RequestParam("userId") String userId) {
        return problemSubmittedRepo.findByUserId(userId);
    }

    @GetMapping("/get-submissions-user-problem-id")
    public List<ProblemSubmitted> getSubmissionsByUserAndProblemId(@RequestParam("userId") String userId, @RequestParam("problemId") String problemId){
        return problemSubmittedRepo.findByUserIdAndProblemId(userId, problemId);
    }
    

}
