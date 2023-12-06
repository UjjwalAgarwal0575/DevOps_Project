package com.example.springbootbackend.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springbootbackend.database.TestCases;
import com.example.springbootbackend.database.TestCasesRepo;


public class RunShellScript {

    public void execute(MultipartFile file, String questionId) {
        System.out.println("hello");
        try {
            // Provide the path to your .sh script
            String curDir = System.getProperty("user.dir");
            // String scriptPath = curDir + "/src/main/java/com/example/springbootbackend/Test/run.sh";
            String scriptPath = curDir + "/run.sh";
            // String filePath = curDir + "/src/main/java/com/example/springbootbackend/Test/";
            String filePath = curDir + "/";


            // Extract fileName and extension to use respective shell command
            // For now, it's only cpp
            String fileName = file.getOriginalFilename();

            System.out.println("Filename: " + fileName);
            // Split fileName into two parts
            String[] splits = fileName.split("\\.", 2);
            String fileType = splits[1];
            byte[] fileContent = file.getBytes();
            

            // Need to pass id of the question here as well to evaluate against specific test cases
            // Additional arguments to pass to the script
            String arg1 = fileType;
            String arg2 = filePath + fileName;
            String arg3 = filePath + "output1.txt";
            
            // get the testcases for a questionId
            // for all the testcases run this

            // Optional<TestCases> testcases = testcasesRepo.findByQuestionId(questionId);
            // System.out.println(testcases);

            // {
            String arg4 = filePath + "test1.txt";
            


            System.out.println("Contents: " + fileContent);


            // Create a new file of the name "" to pass it as a parameter to shellScript
            File convertFile = new File(filePath + fileName);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(fileContent);
            fout.close();


            // Create ProcessBuilder with command and arguments
            ProcessBuilder processBuilder = new ProcessBuilder("bash", scriptPath, arg1, arg2, arg3, arg4);
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

            // }

            // Wait for the process to finish
            int exitCode = process.waitFor();
            System.out.println("Script execution finished with exit code: " + exitCode);

        } 
        catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
