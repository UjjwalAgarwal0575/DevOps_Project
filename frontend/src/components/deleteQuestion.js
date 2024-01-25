import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from './navbar';

const DeleteQuestion = () => {


    const deleteQuestion = async (e) => {

        e.preventDefault();

        const questionId = document.getElementById("id").value;


        axios.delete(`http://localhost:8082/api/delete-question/${questionId}`)
            .then(response => {
                console.log('Document deleted successfully:', response);
            })
            .catch(error => {
                console.error('Error deleting document:', error);
            });
    }


    return (
        <div >

            <Navbar />


            <form onSubmit={deleteQuestion}>
                <div className='add-question-form'>

                    <label htmlFor="title">Id of the Question to Delete:</label>
                    <input type="text" id="id" name="id" required />

                    <button type="submit">Submit</button>

                </div>
            </form>
        </div>
    );

}

export default DeleteQuestion; 