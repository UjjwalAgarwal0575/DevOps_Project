package com.example.springbootbackend.database;
import java.util.Optional;

import com.example.springbootbackend.database.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String>{
    Optional<User> findByEmailId(String emailId);

    Boolean existsByUsername(String username);
    Boolean existsByEmailId(String emailId);

}
