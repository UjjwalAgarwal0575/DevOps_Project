import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import QuestionPage from './components/questionPage';



class Problem{
  constructor(id, title, problemStatement, isSolved, tag){
    this.id = id;
    this.title = title;
    this.problemStatement = problemStatement;
    this.isSolved = isSolved;
    this.tag = tag;
  }
}


function App() {

  const problem1 = new Problem(1, "A small rubric", "asdasdasdasdasdasd", false, "Graphs"); 
  const problem2 = new Problem(2, "N-queens", "asdasdasdasdasdasd", true, "Graphs"); 
  const problem3 = new Problem(3, "Shortest Path", "asdasdasdasdasdasd", false, "Graphs"); 
  const problem4 = new Problem(4, "Largest Rectangle", "asdasdasdasdasdasd", false, "Greedy"); 
  const problem5 = new Problem(5, "Balance the Tree", "asdasdasdasdasdasd", false, "Trees"); 

  const problems = {problem1, problem2, problem3, problem4, problem5};
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard problems={problems}/>} />
          <Route path="/question-page/1" element={<QuestionPage problem={problem1}/>} />
          <Route path="/question-page/2" element={<QuestionPage problem={problem2}/>} />
          <Route path="/question-page/3" element={<QuestionPage problem={problem3}/>} />
          <Route path="/question-page/4" element={<QuestionPage problem={problem4}/>} />
          <Route path="/question-page/5" element={<QuestionPage problem={problem5}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
