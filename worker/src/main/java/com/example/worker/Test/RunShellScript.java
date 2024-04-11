package com.example.worker.Test;



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
import javafx.util.Pair;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// import com.example.springbootbackend.database.TestCases;
// import com.example.springbootbackend.database.TestCasesRepo;


public class RunShellScript {

    public List<Pair<String, String>> execute(String file, String code, String fileType, List<List<String>> testcase) {
        System.out.println("hello");        
        System.out.println(testcase);

        List<Pair<String, String>> resultArray = new ArrayList<>();

        try {
            // Provide the path to your .sh script
            String curDir = System.getProperty("user.dir");
            // /Users/amar/Documents/DevOps_Project/worker/src/main/java/com/example/worker/Test/RunShellScript.java
            // String Path = curDir + "/src/main/java/com/example/springbootbackend/Test/run.sh";
            String createExecutablePath = curDir + "/src/main/java/com/example/worker/Test/createExecutable.sh";
            String executePath = curDir + "/src/main/java/com/example/worker/Test/execute.sh";
            String filePath = curDir + "/src/main/java/com/example/worker/Test/";
            

            // If file is empty, create a file with content as code
            // Create a new code file of the name "" to pass it as a parameter to shellScript
            byte[] fileContent;
            String fileName;

            if (file == ""){
                fileContent = code.getBytes();
                fileName = "default_filenamet" + "." + fileType;
            }
            else{
                fileContent = file.getBytes();
                // filaName = file.getOriginalFilename();
                fileName = "default_filename" + "." + fileType;
            }

            // System.out.println("Original fileName is: " + fileName);

            File convertFile = new File(filePath + fileName);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(fileContent);
            fout.close();
   

            // Additional arguments to pass to the script
            String arg1 = fileType;
            String arg2 = filePath + fileName;
            
            
            int counter = 0;

            for (List<String> testcasepair: testcase){

                System.out.println(testcasepair);
                System.out.println(testcasepair.get(0));
                System.out.println(testcasepair.get(1));
                
                
                String arg3 = filePath + "testOutput" + counter +".txt";
                String arg4 = filePath + "testInput.txt";
                String arg5 = filePath + "source";

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
                // ProcessBuilder processBuilder = new ProcessBuilder("bash", scriptPath, arg1, arg2, arg3, arg4);
                System.out.println(arg1);
                ProcessBuilder processBuilder = new ProcessBuilder("bash", createExecutablePath, arg1, arg2, arg5);
                // System.out.println(processBuilder.command());
                
                // Redirect error stream to output stream
                processBuilder.redirectErrorStream(true);
                
                // Start the process
                Process process = processBuilder.start();
                process.waitFor();
                
                if(arg1.equals("java"))
                {
                    String basename = fileName;
                    int pos = basename.lastIndexOf('.');
                    if (pos > 0) {
                        basename = basename.substring(0, pos);
                    }
                    System.out.println("Basename: " + basename);
                    arg5 = basename;
                }
                System.out.println("Argument 5 is : " + arg5);
                ProcessBuilder processBuilder_execute = new ProcessBuilder("bash", executePath, arg1, arg5, arg4, arg3);
                
                // Redirect error stream to output stream
                processBuilder_execute.redirectErrorStream(true);
                
                // Start the process
                Process process_execute = processBuilder_execute.start();
                
                // // Read the output of the script
                // try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                //     String line;
                //     while ((line = reader.readLine()) != null) {
                //         System.out.println("Printing the line " + line);
                //     }
                // }

                // Wait for the process to finish
                int exitCode = process_execute.waitFor();
                

                System.out.println(arg1+arg2+arg3+arg4+arg5);
                Path userOutputPath = Paths.get(filePath + "testOutput" + counter +".txt");
                Path expectedOutputPath = Paths.get(filePath + "testExpectedOutput.txt");

                try {
                    boolean areContentsEqual = compareFileContents(userOutputPath, expectedOutputPath);
                    
                    String userOutput = Files.readString(userOutputPath);
                    
                    if (areContentsEqual) {
                        String key = counter + "    Passed";
                        Pair <String, String> pair = new Pair<>(key, userOutput);
                        resultArray.add(pair);
                        System.out.println("The contents of the files are equal.");
                    } else {
                        String key = counter + "    Failed";
                        Pair <String, String> pair = new Pair<>(key, userOutput);
                        resultArray.add(pair);
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
