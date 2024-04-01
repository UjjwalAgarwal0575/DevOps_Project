import React, {useState} from 'react';
import axios from 'axios';
import { Navbar } from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const UpdateQuestion = () => {
    
    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const updateQuestion = async (e) => {

        e.preventDefault();

        const questionId = document.getElementById("id").value;
        const title = document.getElementById("title").value;
        const problemStatement = document.getElementById("problemStatement").value;
        const constraints = document.getElementById("constraints").value;
        const tag = document.getElementById("tag").value;

        const updatedData = {questionId, title, problemStatement, constraints, tag};
        // console.log(id);
        console.log(title);
        console.log(problemStatement);
        console.log(constraints);
        console.log(tag);


        // Update the data
        axios.put(`http://localhost:8082/api/update-question-by-id/${questionId}`, updatedData)
        .then( (response) => {
            console.log('Document updated successfully:', response.data);
            routeChange("/");
            window.location.reload();
        })
        .catch ((error) => {
            console.error('Error updating document by fieldName:', error);
            alert("Error updating problem");
        });
    }



    return (
        <div >


            <form onSubmit={updateQuestion}>
                <div className='add-question-form'>

                    <h4 style={{ textAlign: 'center' }}>Update Problem</h4>
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

                    <br></br>
                    <br></br>
                    <button type="submit">Update</button>
                </div>

            </form>
        </div>
    );

}

export default UpdateQuestion; 