import { react, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './navbar';
import { Results } from './results';
import { saveAs } from 'file-saver';
import { MonacoEditorComponent} from './monacoEditor';

function QuestionPage(props) {

    const { id } = useParams();
    const problemId = `problem${id}`;
    const problem = props.problems[problemId];

    // console.log("problemId: ", problemId);
    // console.log("problem: ", problem);

    const [sampleInput, setSampleInput] = useState("");
    const [sampleOutput, setSampleOutput] = useState("");
    const [testcase, setTestcase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resultArray, setResultArray] = useState([]);
    const [displayResult, setDisplayResult] = useState(false);
    const [addSubmissionBool, setAddSubmissionBool] = useState(false);
    const [fileContentForSubmission, setFileContentForSubmission] = useState("");

    const [selectedCodeFile, setSelectedCodeFile] = useState(null);
    const [code, setCode] = useState("");
    var [fileType, setFileType] = useState("cpp");


    let navigate = useNavigate();
    const routeChange = (path, data) => {
        navigate(path, {state: {data}});
    }

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

                // console.log(testcaseArray);

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
            console.log(fileContentForSubmission);
    
            // Now we know the problem has passed all the testcases
            // make an entry in problemSubmission table
        
            const submissionData = {
                "code": fileContentForSubmission,
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
            // const data = {problemId: problemId};

            // console.log("here I am");
            console.log(problemId);

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
        
        // the problem is accepted
        if (verdict === "Passed"){
            addSolvedProblem();
        }

        // if verdict is Passed
        // append the questionNumber 

    }, [resultArray]);
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedCodeFile(file);


        const reader = new FileReader(); // Create a new FileReader object

        reader.onload = (event) => {
            const content = event.target.result; // Get the file content as a string
            setFileContentForSubmission(content); // Update the file content state
        };

        reader.readAsText(file); // Read the file as text
    };


    const submitCode = async () => {
        if (!selectedCodeFile) {
            alert("Select a file to upload!");
        } 
        else {
            try {
                const formData = new FormData();
                
                // if code file is selected
                // get it's extension and use it as filetype 
                // if (selectedCodeFile){
                const filename = document.getElementById("submissionFile").files[0].name;
                    // console.log(filename);
                fileType = filename.split('.').pop();
                    // console.log(fileType);
                // }

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

                // console.log('API Response:', response.data);
                setResultArray(response.data);
                setDisplayResult(true);
                setAddSubmissionBool(true);
                // addSubmission();

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }



    const viewSubmissions = () =>{
        const data = {problemId: problemId, userId: JSON.parse(localStorage.getItem("userData")).id};
        routeChange('/submissions', data);
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
                    <input type="file" id="submissionFile" onChange={handleFileChange} />
                    <br></br>
                    <br></br>
                    {(localStorage.getItem("userData") !== null) ? <button onClick={submitCode}>Submit</button> : <p>Log In to Submit</p>}
                    {/* <br></br> */}
                    {/* <button onClick={viewSubmissions}>View Submissions</button> */}
                </div>


                <div className='half'>
                    {/* <label for="language-dropdown">Select language: </label> */}
            
                    <div className='horizontal'>
                        {(localStorage.getItem("userData") !== null) && <button onClick={viewSubmissions}>View Submissions</button>}
                        <div className='quarter'><MonacoEditorComponent testcase={testcase} problemId={problemId} resultArray={resultArray} setResultArray={setResultArray} setDisplayResult={setDisplayResult}/></div>
                        <div className='quarter'><Results displayResult={displayResult} resultArray={resultArray} testcases={testcase}/></div>
                    </div>
                </div>

            </div>

        </>

    );
}


export default QuestionPage;