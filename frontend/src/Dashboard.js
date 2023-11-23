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
        <h1>SpeedCoder</h1>
        <a href="#" class="profile-button">Profile</a>
      </header>

      <h2 className='problem-section'> Introductory Problems </h2>
      <div class="problem-list">
        <QuestionRibbon problem={problems.problem1} />
        <QuestionRibbon problem={problems.problem2} />
        <QuestionRibbon problem={problems.problem3} />
        <QuestionRibbon problem={problems.problem4} />
        <QuestionRibbon problem={problems.problem5} />
      </div>


      <h2 className='problem-section'>Sorting and Searching</h2>
      <div class="problem-list">
        <QuestionRibbon problem={problems.problem6} />
        <QuestionRibbon problem={problems.problem7} />
        <QuestionRibbon problem={problems.problem8} />
        {/* <QuestionRibbon problem={problems.problem9} />
        <QuestionRibbon problem={problems.problem10} /> */}
      </div>

      <h2 className='problem-section'>Dynamic Programming</h2>
      <div class="problem-list">
        <QuestionRibbon problem={problems.problem11} />
        <QuestionRibbon problem={problems.problem12} />
        <QuestionRibbon problem={problems.problem13} />
        {/* <QuestionRibbon problem={problems.problem14} />
        <QuestionRibbon problem={problems.problem15} /> */}
      </div>

      <h2 className='problem-section'>Graph Algorithms </h2>
      <div class="problem-list">
        <QuestionRibbon problem={problems.problem16} />
        <QuestionRibbon problem={problems.problem17} />
        <QuestionRibbon problem={problems.problem18} />
        {/* <QuestionRibbon problem={problems.problem19} />
        <QuestionRibbon problem={problems.problem20} /> */}
      </div>


      {/* <h2 className='problem-section'> Trees </h2>
      <div class="problem-list">
        <QuestionRibbon problem={problems.problem21} />
        <QuestionRibbon problem={problems.problem22} />
        <QuestionRibbon problem={problems.problem23} />
        <QuestionRibbon problem={problems.problem24} />
        <QuestionRibbon problem={problems.problem25} />

      </div> */}

      {/* <footer>
        <p>&copy; 2023 Coding Practice. All rights reserved.</p>
      </footer> */}
    </>
  );
}

export default Dashboard;
