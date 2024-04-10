package com.example.worker.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionData {
    private String file;
    private String code;
    private String fileType;
    private String testcase;

    // Getter for 'file' field
    public String getFile() {
        return file;
    }

    // Setter for 'file' field
    public void setFile(String file) {
        this.file = file;
    }

    // Getter for 'code' field
    public String getCode() {
        return code;
    }

    // Setter for 'code' field
    public void setCode(String code) {
        this.code = code;
    }

    // Getter for 'fileType' field
    public String getFileType() {
        return fileType;
    }

    // Setter for 'fileType' field
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    // Getter for 'testcase' field
    public String getTestcase() {
        return testcase;
    }

    // Setter for 'testcase' field
    public void setTestcase(String testcase) {
        this.testcase = testcase;
    }
}
