import { react, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar } from './navbar';
import { Results } from './results';
import { Editor } from './codeEditor';
import { saveAs } from 'file-saver';

function QuestionPage(props) {

    const { id } = useParams();
    const problemId = `problem${id}`;
    const problem = props.problems[problemId];

    console.log("problemId: ", problemId);
    console.log("problem: ", problem);

    const [sampleInput, setSampleInput] = useState("");
    const [sampleOutput, setSampleOutput] = useState("");
    const [testcase, setTestcase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resultArray, setResultArray] = useState([]);
    const [displayResult, setDisplayResult] = useState(false);

    const [selectedCodeFile, setSelectedCodeFile] = useState(null);
    const [code, setCode] = useState("");
    const [fileType, setFileType] = useState("cpp");

    // get first testcase from the database

    useEffect(() => {

        setLoading(false);

        axios.get(`http://localhost:8082/api/get-testcase-by-id/${problem.questionId}`)
            .then((response) => {
                // console.log("Testcases by specific id: ", response);
                // console.log("A Testcase: ", response.data.testCases[0]);
                // console.log("JSON Testcase: ", JSON.parse(response.data.testCases[0]));

                var testcaseArray = [];
                for (var index = 0; index < response.data.testCases.length; index++) {
                    var inputoutput = JSON.parse(response.data.testCases[index]);

                    testcaseArray.push([inputoutput.input, inputoutput.output]);
                }

                console.log(testcaseArray);

                setSampleInput(testcaseArray[0][0]);
                setSampleOutput(testcaseArray[0][1]);
                setTestcase(testcaseArray);

                setLoading(false);
                // console.log(testcase);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedCodeFile(file);
    };

    function handleFileTypeChange() {
        var dropdown = document.getElementById("language-dropdown");
        var selectedOption = dropdown.options[dropdown.selectedIndex].value;
        setFileType(selectedOption);
    }


    const submitCode = async () => {
        if (!selectedCodeFile && code === "") {
            alert("Write some piece of code or select a file to upload!");
        } 
        else {
            try {
                const formData = new FormData();

                formData.append('file', selectedCodeFile);
                formData.append('sourceCode', code);
                formData.append('fileType', fileType);
                formData.append('testcase', JSON.stringify(testcase));
                
                console.log(fileType);

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
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }


    return (

        <>
            <Navbar />
            {/* <h1>{code}</h1> */}

            <div className='question-page-container'>
                
                <div className='half problem-statement'>

                    <div className="problem-title">
                        <h3>Problem {problem.questionId}: {problem.title} </h3>
                    </div>
                    {/* <div className="question-ribbon-header">
                    <h4 className="question-ribbon-id">Problem # {problem.questionId}</h4>
                    <h4 className="question-ribbon-title">{problem.title}</h4>
                </div> */}
                    <br></br>
                    <br></br>
                    <div className="problem-description">
                        <p>{problem.problemStatement}</p>
                        <p>Constraints:</p>
                        <ul>
                            <li dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                            {/* {problem.constraints}</li> */}
                            {/* <li>Output: ...</li> */}
                        </ul>
                    </div>
                    <div className="input-output" >
                        <div><strong>Input:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: sampleInput }} />
                        <div><strong>Output:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: sampleOutput }} />
                    </div>

                    <br></br>
                    <input type="file" onChange={handleFileChange} />
                    <br></br>
                    <br></br>
                    <label for="language-dropdown">Select language: </label>
                    <br></br>
                    <select id="language-dropdown" className='language-dropdown' onChange={handleFileTypeChange}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="py">Python</option>
                        <option value="c">C</option>
                    </select>
                    <br></br>
                    <br></br>
                    <button onClick={submitCode}>Submit</button>
                </div>

                <div className='half'>
                    <div className='horizontal'>
                        <div className='quarter'><Editor setCode={setCode} /></div>
                        <div className='quarter'><Results displayResult={displayResult} resultArray={resultArray} testcases={testcase}/></div>
                    </div>
                </div>

            </div>

        </>

    );
}


export default QuestionPage;