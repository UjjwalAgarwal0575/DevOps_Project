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

  // Later, we may need to bucket the problems based on tag and store them somewhere before showing them here.

  return (
    <>
      <header>
        <h1>AceCoder</h1>
        <a href="#" className="profile-button">Profile</a>
      </header>


      <h2 className='problem-section'> Introductory Problems </h2>
      <div className="problem-list">
        {Object.entries(problems).map(([key, value]) => (
            <QuestionRibbon problem={value} />
        ))}
      </div>
          
    </>
  );
}

export default Dashboard;
