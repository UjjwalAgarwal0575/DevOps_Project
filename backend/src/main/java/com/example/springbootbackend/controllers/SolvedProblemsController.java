package com.example.springbootbackend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.database.SolvedProblems;
import com.example.springbootbackend.database.SolvedProblemsRepo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/api")
@CrossOrigin
public class SolvedProblemsController {
    @Autowired
    private SolvedProblemsRepo solvedProblemsRepo;


    @PostMapping("/add-solved-problem")
    public SolvedProblems addSolvedProblem(@RequestParam String userId, @RequestBody String problemId) {
        SolvedProblems solvedProblems = solvedProblemsRepo.findByUserId(userId);
        System.out.println(solvedProblems);

        if (solvedProblems == null) {
            solvedProblems = new SolvedProblems();
            solvedProblems.setUserId(userId);
        }
        
        // Add the problemId to the acceptedProblems list
        List<String> acceptedProblems = solvedProblems.getAcceptedProblems();
        acceptedProblems.add(problemId);
        solvedProblems.setAcceptedProblems(acceptedProblems);
        // Save the updated or new SolvedProblems object
        return solvedProblemsRepo.save(solvedProblems);
    }
    

    @GetMapping("/get-solved-problems-user-id")
    public List<String> getSolvedProblems(@RequestParam("userId") String userId) {
        SolvedProblems solvedProblem = solvedProblemsRepo.findByUserId(userId);

        if (solvedProblem == null) return new ArrayList<>();
        return solvedProblem.getAcceptedProblems();
    }
    
}
