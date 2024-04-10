package com.example.springbootbackend.database;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
// @NoArgsConstructor
// @AllArgsConstructor
@Document (collection = "testcases")
public class TestCases {
    
    // id of the question
    private String questionId;
    private List<String> testCases;

    public TestCases(){
        this.questionId = "";
        this.testCases = new ArrayList<String>();
    }

    public TestCases(String questionId, List<String> testCases){
        this.questionId = questionId;
        this.testCases = testCases;
    }

}
