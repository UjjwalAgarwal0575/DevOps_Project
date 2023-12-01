package com.example.springbootbackend.database;

import java.lang.reflect.Array;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document (collection = "testcases")
public class TestCases {
    
    // id of the question
    private String questionId;
    private TestCase testCases;


    // public TestCases(String questionId, List<TestCase> testCases){
    //     this.questionId = questionId;
    //     this.testCases = testCases;
    // }

}
