import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import QuestionPage from './components/questionPage';
import AddQuestion from './admin/addQuestion';
import DeleteQuestion from './admin/deleteQuestion';
import UpdateQuestion from './admin/updateQuestion';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Auth } from './authentication/auth';
import Submissions from './components/submissions';
import AdminDashboard from './admin/AdminDashboard';


class Problem {
  constructor(questionId, title, problemStatement, constraints, examples, isSolved, tag) {
    this.questionId = questionId;
    this.title = title;
    this.problemStatement = problemStatement;
    this.constraints = constraints;
    this.examples = examples;
    this.isSolved = isSolved;
    this.tag = tag;
  }
}


function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [loggedInUserId, setLoggedInUserId] = useState("");
  const [userSolvedProblems, setUserSolvedProblems] = useState([]);

  useEffect(() => {
    setLoading(true);

    if (localStorage.getItem("userData") !== null) {
      const id = JSON.parse(localStorage.getItem("userData")).id;

      axios.get('http://localhost:8082/api/get-solved-problems-user-id?userId='+id)
      .then((response)=>{
        // console.log(response.data);
        setUserSolvedProblems(response.data);
      })
      .catch((error) => {
        console.log("Error is getting solved problems ", error);
      })
    }

    // get-questions
    axios.get('http://localhost:8082/api/get-questions')
      .then((response) => {
        // console.log("Questions Response: ", response);
        setData(response.data);
        // console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });


    // check if the user is logged In 
    // if he is, then get all the questions 

  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className='ErrorLoading'>Error: {error.message}</p>;
  }


  const problems = {};
  const cleanedUserSolvedProblems = userSolvedProblems.map(problem => problem.replace(/\"/g, ''));

  data.forEach((problemData, index) => {
    
    var solved = false;
    var problemKey = "problem" + problemData.questionId;

    if (cleanedUserSolvedProblems.includes(problemKey)){
      // console.log("here here");
      solved = true;
    }

    var problem = new Problem(
      problemData.questionId,
      problemData.title,
      problemData.problemStatement,
      problemData.constraints,
      { input: "3", output: "3 10 5 16 8 4 2 1" },
      solved,
      problemData.tag
    );

    problems[problemKey] = problem;
    // console.log(`Index: ${index}, Value: ${problem}`);
  });



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard problems={problems} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/delete-question" element={<DeleteQuestion />} />
          <Route path="/update-question" element={<UpdateQuestion />} />
          <Route path="/question-page/:id" element={<QuestionPage problems={problems} />} />
          <Route path="/submissions" element={<Submissions />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
