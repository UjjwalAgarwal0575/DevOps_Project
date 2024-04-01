import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const DeleteQuestion = () => {

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const deleteQuestion = async (e) => {

        e.preventDefault();

        const questionId = document.getElementById("id").value;


        axios.delete(`http://localhost:8082/api/delete-question/${questionId}`)
            .then(response => {
                console.log('Document deleted successfully:', response);
                routeChange("/");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting document:', error);
                alert("Error deleting Problem");
            });
    }


    return (
        <div >

            <form onSubmit={deleteQuestion}>
                <div className='add-question-form'>

                    <h4 style={{ textAlign: 'center' }}>Delete Problem</h4>


                    <label htmlFor="title">Id of the Question to Delete:</label>
                    <input type="text" id="id" name="id" required />

                    <button type="submit">Submit</button>

                </div>
            </form>
        </div>
    );

}

export default DeleteQuestion; 