package com.example.springbootbackend.database;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestCasesRepo extends MongoRepository<TestCases, String>{}

