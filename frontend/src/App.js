import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import QuestionPage from './components/questionPage';
import AddQuestion from './components/addQuestion';
import DeleteQuestion from './components/deleteQuestion';
import UpdateQuestion from './components/updateQuestion';
import axios from 'axios';
import { useState, useEffect } from 'react';


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

  useEffect(() => {
    setLoading(true);
    
    // get-questions
    axios.get('http://localhost:8082/api/get-questions')
      .then((response) => {
        console.log("Questions Response: ", response);
        setData(response.data);
        setLoading(false);
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


  const problems = {};

  data.forEach((problemData, index) => {
      var problem = new Problem(
        problemData.questionId,  
        problemData.title, 
        problemData.problemStatement, 
        problemData.constraints,
        { input: "3", output: "3 10 5 16 8 4 2 1" }, 
        false, 
        problemData.tag
      );
      
      var problemKey = "problem" + problemData.questionId;
      problems[problemKey] = problem; 
      // console.log(`Index: ${index}, Value: ${problem}`);
  });
  
  // var problem1 = new Problem(
  //   "123", 
  //   "test problem 1", 
  //   "asadsadda asda asdasd asd asdasds adjgasjgd kSHYWQDQ OSHHXAKSCHA asdas", 
  //   "1 < n < 27", 
  //   "4\n2 4 5", 
  //   "false", 
  //   "greedy");

  // var problem2 = new Problem(
  //   "125", 
  //   "test problem 2", 
  //   "asadsadda asda asdasd asd asdasds adjgasjgd kSHYWQDQ OSHHXAKSCHA asdas", 
  //   "1 < n < 20", 
  //   "ABFGC\nWIUON", 
  //   "false", 
  //   "greedy");

    
  //   problems["problem123"] = problem1;
  //   problems["problem125"] = problem2;
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard problems={problems} />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/delete-question" element={<DeleteQuestion />} />
          <Route path="/update-question" element={<UpdateQuestion />} />
          <Route path="/question-page/:id" element={<QuestionPage problems={problems}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
