package com.example.springbootbackend.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
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

    public List<String> execute(MultipartFile file, String code, String fileType, List<List<String>> testcase) {
        System.out.println("hello");        
        System.out.println(testcase);

        List<String> resultArray = new ArrayList<>();

        try {
            // Provide the path to your .sh script
            String curDir = System.getProperty("user.dir");
            String scriptPath = curDir + "/src/main/java/com/example/springbootbackend/Test/run.sh";
            String filePath = curDir + "/src/main/java/com/example/springbootbackend/Test/";
            

            // If file is empty, create a file with content as code
            // Create a new code file of the name "" to pass it as a parameter to shellScript
            byte[] fileContent;

            if (file == null){
                fileContent = code.getBytes();
            }
            else{
                fileContent = file.getBytes();
                // int lastDotIndex = filename.lastIndexOf('.');
                // String fileExtension = lastDotIndex == -1 ? "" : filename.substring(lastDotIndex + 1);
                // System.out.println(fileExtension);
            }


            File convertFile = new File(filePath + "source." + fileType);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(fileContent);
            fout.close();
   

            // Additional arguments to pass to the script
            String arg1 = fileType;
            String arg2 = filePath + "source." + fileType;
            
            
            int counter = 0;

            for (List<String> testcasepair: testcase){

                System.out.println(testcasepair);
                System.out.println(testcasepair.get(0));
                System.out.println(testcasepair.get(1));
                
                
                String arg3 = filePath + "testOutput" + counter +".txt";
                String arg4 = filePath + "testInput.txt";

                System.out.println("Contents: " + fileContent);
                
                // Create a testfile Input.txt with fileContent of testcasepair
                try (FileOutputStream fos = new FileOutputStream(filePath + "testInput.txt")) {
                    // Convert the string to bytes and write to the file
                    fos.write(testcasepair.get(0).getBytes());
                    
                    System.out.println("TestInput File generated Succesfully!");
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Error writing string to file: " + e.getMessage());
                }
                
                // Create a testfile ExpectedOutput.txt with fileContent of testcasepair
                try (FileOutputStream fos = new FileOutputStream(filePath + "testExpectedOutput.txt")) {
                    // Convert the string to bytes and write to the file
                    fos.write(testcasepair.get(1).getBytes());
                    
                    System.out.println("TestExpectedOutput File generated Succesfully!");
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Error writing string to file: " + e.getMessage());
                }


                
             
                
                // Create ProcessBuilder with command and arguments
                ProcessBuilder processBuilder = new ProcessBuilder("bash", scriptPath, arg1, arg2, arg3, arg4);
                // System.out.println(processBuilder.command());
                
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
                
                Path userOutputPath = Paths.get(filePath + "testOutput" + counter +".txt");
                Path expectedOutputPath = Paths.get(filePath + "testExpectedOutput.txt");

                try {
                    boolean areContentsEqual = compareFileContents(userOutputPath, expectedOutputPath);
        
                    if (areContentsEqual) {
                        resultArray.add("TestCase: " + counter + "    Passed");
                        System.out.println("The contents of the files are equal.");
                    } else {
                        resultArray.add("TestCase: " + counter + "    Failed");
                        System.out.println("The contents of the files are not equal.");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Error comparing file contents: " + e.getMessage());
                }

                System.out.println("Script execution finished with exit code: " + exitCode);

                counter++;
            }

        } 
        catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return resultArray;
    }

    private static boolean compareFileContents(Path path1, Path path2) throws IOException {
        // Read file contents into lists of strings
        List<String> lines1 = Files.readAllLines(path1);
        List<String> lines2 = Files.readAllLines(path2);

        // Compare the contents line by line
        return lines1.equals(lines2);
    }
}
