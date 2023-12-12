package com.example.springbootbackend.database;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepo extends MongoRepository<Question, String>{

    void deleteByQuestionId(String questionId);
    
    @Query("{'questionId': ?0}")
    Question updateQuestionByQuestionId(@Param("questionId") String questionId, Question question);

}

