package com.example.springbootbackend.database;


import java.util.Optional;

public class UserRepoImpl{
    
    private final UserRepo userRepo;

    public UserRepoImpl(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    public void createUser(User user) {
        this.userRepo.save(user);
    }

    public Optional<User> getUserById(String id) {
        return this.userRepo.findById(id);
    }

}
