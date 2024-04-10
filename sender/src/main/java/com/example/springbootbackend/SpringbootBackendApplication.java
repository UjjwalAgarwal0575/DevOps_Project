package com.example.springbootbackend;

import org.springframework.boot.CommandLineRunner;

// import java.lang.System.Logger;
// import java.util.List;
// import java.util.logging.LogManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner{

	private static final Logger logger =
            LogManager.getLogger(SpringbootBackendApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Override
	public void run(String ...args) throws Exception{
		logger.debug("This is a debug message"); // DEBUG level
       	 	logger.info("Spring Application Running"); // INFO level

		logger.warn("This is a warning message"); // WARN level
        	logger.error("This is an error message"); // ERROR level

		System.setOut(new java.io.PrintStream(System.out) {
			@Override
			public void println(String message) {
				logger.info(message);
			}
		});
	}
	
}
