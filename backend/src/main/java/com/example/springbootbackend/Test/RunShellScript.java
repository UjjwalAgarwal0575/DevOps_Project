package com.example.springbootbackend.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.web.multipart.MultipartFile;

public class RunShellScript {

    public void execute(MultipartFile file) {
        System.out.println("hello");
        try {
            // Provide the path to your .sh script
            String curDir = System.getProperty("user.dir");
            String scriptPath = curDir + "/src/main/java/com/example/springbootbackend/Test/run.sh";
            String filePath = curDir + "/src/main/java/com/example/springbootbackend/Test/";


            // Extract fileName and extension to use respective shell command
            // For now, it's only cpp
            String fileName = file.getOriginalFilename();

            System.out.println("Filename: " + fileName);
            

            // Need to pass id of the question here as well to evaluate against specific test cases
            // Additional arguments to pass to the script
            String arg1 = filePath + fileName;
            String arg2 = filePath + "output1.txt";
            String arg3 = filePath + "test1.txt";
            

            // Split fileName into two parts
            String[] splits = fileName.split("\\.", 2);
            String fileType = splits[1];
            byte[] fileContent = file.getBytes();

            System.out.println("Contents: " + fileContent);


            // Create a new file of the name "" to pass it as a parameter to shellScript
            File convertFile = new File(filePath + fileName);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(fileContent);
            fout.close();


            // Create ProcessBuilder with command and arguments
            ProcessBuilder processBuilder = new ProcessBuilder("bash", scriptPath, arg1, arg2, arg3);
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
