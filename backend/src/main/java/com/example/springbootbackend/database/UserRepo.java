package com.example.springbootbackend.database;
// import com.example.springbootbackend.database.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String>{
    
    public void createEntry(User user);
    public Optional<User> getUserById(String id);

}
