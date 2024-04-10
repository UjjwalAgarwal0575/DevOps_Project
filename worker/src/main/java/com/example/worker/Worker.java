package com.example.worker;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.example.worker.model.ProblemSubmitted;

@Component
public class Worker {
    @RabbitListener(queues = "message_queue")
    public void listener(ProblemSubmitted problemSubmitted) {
        System.out.println(problemSubmitted);
    }
}
