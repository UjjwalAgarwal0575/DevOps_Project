package com.example.springbootbackend.database;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
  
    // @NotBlank
    // @Size(max = 20)
    private String username;    
  
    // @NotBlank
    // @Size(max = 50)
    private String emailId;

    // @NotBlank
    // @Size(max = 120)
    private String password;
  
    public User(String username,String emailId, String password) {
      this.username = username;
      this.emailId = emailId;
      this.password = password;
    }
  
    public String getId() {
      return id;
    }
  
    public void setId(String id) {
      this.id = id;
    }
  
    public String getUsername() {
      return username;
    }
  
    public void setUsername(String username) {
      this.username = username;
    }
  
    public String getEmailId() {
        return emailId;
      }
    
    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
      return password;
    }
  
    public void setPassword(String password) {
      this.password = password;
    }

}
