package com.example.springbootbackend.database;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
// @AllArgsConstructor
@NoArgsConstructor
@Document(collection = "questions")
public class Question {
    
    @Id
    private String id;
    private String title;
    private String problemStatement;
    private String constraints;
    private String tag;


    public Question(String id, String title, String problemStatement, String constraints, String tag){
        this.id = id;
        this.title = title;
        this.problemStatement = problemStatement;
        this.constraints = constraints;
        this.tag = tag;
    }
    // public String getId(){
    //     return this.id;
    // }

    // public String getUsername(){
    //     return this.username;
    // }

    // public void setId(String id){
    //     this.id = id;
    // }

    // public void setUsername(String username){
    //     this.username = username;
    // }


}
