package com.example.springbootbackend.database;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProblemSubmittedRepo extends MongoRepository<ProblemSubmitted, String> {
    
    List<ProblemSubmitted> findByUserId(String userId);
    List<ProblemSubmitted> findByUserIdAndProblemId(String userId, String problemId);

}
