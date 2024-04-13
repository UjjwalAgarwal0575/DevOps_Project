import React,  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './navbar';
import { useNavigate, useParams } from 'react-router-dom';


const Submissions = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionHistory, setSubmissionHistory] = useState([]);
  
    
    let navigate = useNavigate();
    const routeChange = (path, data) => {
        navigate(path, {state: {data}});
    }
    
    
    const handleItemClick = (obj) => {
        alert(obj.code);
    };
    
    
    const location = useLocation();
    const data = location.state.data;


    useEffect(() => {

        setLoading(false);

        axios.get(`http://localhost:8082/api/get-submissions-user-problem-id?problemId=${data.problemId}&userId=${data.userId}`)
            .then((response) => {

                setSubmissionHistory(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    }, []);


    const submissionHistoryRendered = submissionHistory.map(obj => (
        <div className="submission-ribbon" key={obj.id} onClick={() => handleItemClick(obj)}>
            <div className={obj.accepted}>
                <div>Submission Id: {obj.submissionId}</div>
                <h4>{obj.accepted}</h4>
  
            </div>
        </div>
    ));

    return (
        <>
        <Navbar />
        {/* <div className="question-page-container"> */}
        {/* <h4>{data.problem.title}</h1> */}
            <div className='submission-ribbon '>
               {submissionHistoryRendered}
            </div>
        {/* </div> */}
        </>
    );

}


export default Submissions;