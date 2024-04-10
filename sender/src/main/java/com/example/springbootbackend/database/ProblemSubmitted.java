package com.example.springbootbackend.database;

import org.springframework.data.annotation.Id;
// import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document (collection = "submissions")
public class ProblemSubmitted {
    @Id
    private String id;
    private String userId;
    private String problemId;
    private String accepted;
    private String code;
}
