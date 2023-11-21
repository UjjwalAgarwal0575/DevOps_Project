import QuestionRibbon from './components/questionRibbon';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import QuestionPage from './components/questionPage';





function Dashboard(props) {

  const problems = props.problems;

  return (
    <>
      <header>
        <h1>HellCoder</h1>
      </header>

      <div class="problem-list">
          <QuestionRibbon problem={problems.problem1}/>
          <QuestionRibbon problem={problems.problem2}/>
          <QuestionRibbon problem={problems.problem3}/>
          <QuestionRibbon problem={problems.problem4}/>
          <QuestionRibbon problem={problems.problem5}/>
      </div>
    </>
  );
}

export default Dashboard;
