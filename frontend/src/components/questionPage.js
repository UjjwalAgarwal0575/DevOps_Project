import { react, useState } from 'react';
import axios from 'axios';

function QuestionPage(props) {

    const problem = props.problem;
    const [selectedCodeFile, setSelectedCodeFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedCodeFile(file);
    };


    const submitCode = async () => {
        if (!selectedCodeFile) {
            alert("Please select a file to upload!");
        }else {
            try {
                const formData = new FormData();
                formData.append('file', selectedCodeFile);

                const axiosInstance = axios.create({
                    baseURL: 'http://localhost:8082', // Update with your backend container name and port
                });

                const response = await axiosInstance.get('/api/get-data', {
                  headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                  },
                });
          
                console.log('API Response:', response.data);
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        }
    }


    return (

        <>
            <header>
                <h1>SpeedCoder</h1>
                <a href="#" class="profile-button">Profile</a>
            </header>
            <div class="problem-statement">

                <div class="problem-title">
                    <h3>Problem {problem.id}: {problem.title} </h3>
                </div>
                <br></br>
                <br></br>
                <div class="problem-description">
                    <p>{problem.problemStatement}</p>
                    <p>Constraints:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                        {/* {problem.constraints}</li> */}
                        {/* <li>Output: ...</li> */}
                    </ul>
                </div>
                <div class="input-output" >
                    <div><strong>Input:</strong></div>
                    <code dangerouslySetInnerHTML={{ __html: problem.examples.input }} />
                    <div><strong>Output:</strong></div>
                    <code dangerouslySetInnerHTML={{ __html: problem.examples.output }} />
                </div>

                <br></br>
                <input type="file" onChange={handleFileChange} />
                <br></br>
                <br></br>
                <button onClick={submitCode}>Submit</button>
            </div>
        </>

    );
}


export default QuestionPage;