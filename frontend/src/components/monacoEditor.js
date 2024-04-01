import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';


const files = {
  "py": {
    name: "source.py",
    language: "python",
    value: "print('Hello world')"
  },
  "cpp": {
    name: "source.cpp",
    language: "cpp",
    value: "#include <iostream>"
  },
  "c": {
    name: "source.c",
    language: "c",
    value: "#include <stdio.h>"
  },
  "java": {
    name: "source.java",
    language: "java",
    value: "System.out.println('Hello world!')"
  }
}

export const MonacoEditorComponent = ({testcase, problemId, resultArray, setResultArray, setDisplayResult}) => {


  useEffect(()=>{

    var verdict = "";

    const addSubmission = async () => {
    
        console.log(resultArray);

        verdict = "Passed";
        // Using forEach method
        resultArray.forEach(obj => {
            // obj.key.substring may contains leading spaces which we should remove
            // instead we can use a inbuilt function to check the string ends with "Failed"
            if (obj.key.substring(2).endsWith("Failed")) {
                verdict = "Failed";
            }
        });
        

        const userData = JSON.parse(localStorage.getItem("userData"));

        // access the code string from the file


        // Now we know the problem has passed all the testcases
        // make an entry in problemSubmission table
        const submissionData = {
            "code": editorRef.current.getValue(),
            "userId": userData.id,
            "problemId": problemId,
            "accepted": verdict,
        }; 

        
        try{
            const response = await axios.post('http://localhost:8082/api/add-submission', 
            submissionData, 
            {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (response.status === 200){
                console.log("Submission Added with data: ", response.data);
            }

        }catch(error){
            console.log("Error adding the submission: ", error);
        }

    }

    const addSolvedProblem = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));  

      try{
          const response = await axios.post('http://localhost:8082/api/add-solved-problem?userId=' + userData.id, 
          problemId, 
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.status === 200){
              console.log("Solved problem added with data: ", response.data);
          }

      }catch(error){
          console.log("Error adding the solved problem: ", error);
      }
  }


    if (addSubmissionBool) {
        addSubmission();
        setAddSubmissionBool(false);
    }

    if (verdict === "Passed"){
        addSolvedProblem();
    }

}, [resultArray]);




  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  const [fileName, setFileName] = useState("cpp");
  const [addSubmissionBool, setAddSubmissionBool] = useState(false);
  const editorRef = useRef(null);
  const file = files[fileName];


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }


  function handleFileTypeChange(e) {
    var dropdown = document.getElementById("language-dropdown");
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    setFileName(selectedOption);
  }


  const submitCode = async () => {
      try {
        const formData = new FormData();

        formData.append('file', null);
        formData.append('sourceCode', editorRef.current.getValue());
        formData.append('fileType', fileName);
        formData.append('testcase', JSON.stringify(testcase));

        const axiosInstance = axios.create({
          baseURL: 'http://localhost:8082', // Update with your backend container name and port
        });

        const response = await axiosInstance.post('/api/submit-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('API Response:', response.data);
        setResultArray(response.data);
        setDisplayResult(true);
        setAddSubmissionBool(true);

        // if all the testcases are passed
        // mark the question as done
        
        // checkAcceptance();
        // console.log(response.data);

      } catch (error) {
        console.error('Error uploading file:', error);
      }
  }



  return (
    <>
      <select id="language-dropdown" className='language-dropdown' onChange={handleFileTypeChange}>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="py">Python</option>
        <option value="c">C</option>
      </select>

      {(localStorage.getItem("userData") !== null) && <button onClick={submitCode} style={{marginLeft: "5px"}}>Submit</button>}

      <Editor
        // language={fileName} // Set the language you want to use (e.g., "javascript", "html", "css")
        theme="vs-dark" // Choose your preferred theme
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </>
  );
};