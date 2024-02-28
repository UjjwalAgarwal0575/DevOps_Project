import React, { useRef, useState } from 'react';
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
    value: "#include <bits/stdc++.h>"
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

export const MonacoEditorComponent = ({testcase, setResultArray, setDisplayResult}) => {
  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  const [fileName, setFileName] = useState("cpp");
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

      <button onClick={submitCode} style={{marginLeft: "5px"}}>Submit</button>

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