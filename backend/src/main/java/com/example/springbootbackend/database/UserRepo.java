package com.example.springbootbackend.database;
// import com.example.springbootbackend.database.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String>{
}
