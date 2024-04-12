package com.example.worker;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void setValue(String key, String value) {
        System.out.println("Setting Value from Redis: "+ value);
        redisTemplate.opsForValue().set(key, value);
    }

    public String getValue(String key) {
        System.out.println("Getting Value from Redis");
        return redisTemplate.opsForValue().get(key);
    }
}
