package com.example.springbootbackend.database;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestCasesRepo extends MongoRepository<TestCases, String>{

    Optional<TestCases> findByQuestionId(String questionId);
    void deleteByQuestionId(String questionId);

}