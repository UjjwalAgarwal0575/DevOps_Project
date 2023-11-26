package com.example.springbootbackend.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class RunShellScript {

    public void execute() {
        System.out.println("hello");
        try {
            // Provide the path to your .sh script
            String curDir = System.getProperty("user.dir");
            String scriptPath = curDir + "/src/main/java/com/example/springbootbackend/Test/run.sh";
            String filePath = curDir + "/src/main/java/com/example/springbootbackend/Test/";

            // Additional arguments to pass to the script
            String arg1 = filePath + "1.cpp";
            String arg2 = filePath + "output1.txt";
            String arg3 = filePath + "test1.txt";
            
            System.out.println(filePath);

            // Create ProcessBuilder with command and arguments
            ProcessBuilder processBuilder = new ProcessBuilder("bash", scriptPath, arg1,arg2, arg3);
            System.out.println(processBuilder.command());

            // Redirect error stream to output stream
            processBuilder.redirectErrorStream(true);

            // Start the process
            Process process = processBuilder.start();

            // Read the output of the script
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }

            // Wait for the process to finish
            int exitCode = process.waitFor();
            System.out.println("Script execution finished with exit code: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
