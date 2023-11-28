package com.example.springbootbackend.database;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "AceCoderDb")
public class User {
    
    @Id
    private String id;
    private String username;


    public String getId(){
        return this.id;
    }

    public String getUsername(){
        return this.username;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setUsername(String username){
        this.username = username;
    }


}
