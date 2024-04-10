package com.example.springbootbackend.database;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "solvedProblems")
public class SolvedProblems {
    
    @Id
    private String userId;
    private List<String> acceptedProblems;

    public SolvedProblems() {
        this.acceptedProblems = new ArrayList<>();
    }

    // Getter for userId
    public String getUserId() {
        return userId;
    }

    // Setter for userId
    public void setUserId(String userId) {
        this.userId = userId;
    }

    // Getter for acceptedProblems
    public List<String> getAcceptedProblems() {
        return acceptedProblems;
    }

    // Setter for acceptedProblems
    public void setAcceptedProblems(List<String> acceptedProblems) {
        this.acceptedProblems = acceptedProblems;
    }

}
