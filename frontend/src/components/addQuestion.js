import React, {useState} from 'react';
import axios from 'axios';

const AddQuestion = () => {


    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);

    const addTestCase = () => {
      setTestCases([...testCases, { input: '', output: '' }]);
    };
  
    const removeTestCase = (index) => {
      const updatedTestCases = [...testCases];
      updatedTestCases.splice(index, 1);
      setTestCases(updatedTestCases);
    };
  
    const handleInputChange = (index, event) => {
      const { name, value } = event.target;
      const updatedTestCases = [...testCases];
      updatedTestCases[index][name] = value;
      setTestCases(updatedTestCases);
    };


    // Add the question to database
    const addNewQuestion = async (e) => {

        e.preventDefault();

        const id = document.getElementById("id").value;
        const title = document.getElementById("title").value;
        const problemStatement = document.getElementById("problemStatement").value;
        const constraints = document.getElementById("constraints").value;
        const tag = document.getElementById("tag").value;

        const questionData = {id, title, problemStatement, constraints, tag};
        console.log(id);
        console.log(title);
        console.log(problemStatement);
        console.log(constraints);
        console.log(tag);

        // save the question
        try {

            const response = await axios.post('http://localhost:8082/api/add-question', questionData, {
              headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
              },
            });
            console.log('API Response:', response.data);
        } 
        catch (error) {
            console.error('Error adding question:', error);
        }



        // // somehow get the question Id
        // const testCasesData = {id, testCases}; 
        
        // // save the testCases
        // try {

        //     const response2 = await axios.post('http://localhost:8082/api/add-testcases', testCasesData, {
        //       headers: {
        //         // 'Content-Type': 'multipart/form-data',
        //         'Content-Type': 'application/json',
        //       },
        //     });
      
        //     console.log('API Response:', response2.data);
        // } 
        // catch (error) {
        //     console.error('Error adding question:', error);
        // }

    }



    return (
        <div >

            <header>
                <h1>AceCoder</h1>
                <a href="#" className="profile-button">Profile</a>
            </header>


            <form onSubmit={addNewQuestion}>
                <div className='add-question-form'>

                    <label htmlFor="title">Id:</label>
                    <input type="text" id="id" name="id" required />

                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />

                    <label htmlFor="problemStatement">Problem Statement:</label>
                    <textarea id="problemStatement" name="problemStatement" rows="4" required></textarea>

                    <label htmlFor="constraints">Constraints:</label>
                    <textarea id="constraints" name="constraints" rows="2" required></textarea>


                    <br></br>

                    <label htmlFor="tag">Tag:</label>
                    <select id="tag" name="tag">
                        <option value="Greedy">Greedy</option>
                        <option value="Implementation">Implementation</option>
                        <option value="Arrays">Arrays</option>
                        <option value="Strings">Strings</option>
                        <option value="Dynamic Programming">Dynamic Programming</option>
                        <option value="Graphs">Graphs</option>
                        <option value="Trees">Trees</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>

                </div>

                <br></br>

                <div className='add-question-form'>
                    <label>Test Cases</label>
                    <div>
                        {testCases.map((testCase, index) => (
                            <div className='add-testcase-form' key={index}>
                                <label htmlFor={`input${index}`}>Input:</label>
                                <input
                                    type="text"
                                    id={`input${index}`}
                                    name="input"
                                    value={testCase.input}
                                    onChange={(e) => handleInputChange(index, e)}
                                />

                                <label htmlFor={`output${index}`}>Output:</label>
                                <input
                                    type="text"
                                    id={`output${index}`}
                                    name="output"
                                    value={testCase.output}
                                    onChange={(e) => handleInputChange(index, e)}
                                />

                                {testCases.length > 1 && (
                                    <button type="button" onClick={() => removeTestCase(index)}>-</button>
                                )}
                            </div>
                        ))}

                        <br></br>
                        <button type="button" onClick={addTestCase}>+</button>
                    </div>
                </div>
                <br></br>

                <div className='add-question-button'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );

}

export default AddQuestion; 