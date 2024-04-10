package com.example.worker.model;

// import org.springframework.data.annotation.Id;
// // import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProblemSubmitted {
    private String id;
    private String userId;
    private String problemId;
    private String accepted;
    private String code;
}
