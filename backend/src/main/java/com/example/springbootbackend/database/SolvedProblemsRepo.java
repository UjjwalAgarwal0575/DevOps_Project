package com.example.springbootbackend.database;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SolvedProblemsRepo extends MongoRepository<SolvedProblems, String> {

    SolvedProblems findByUserId(String userId);
    
}
