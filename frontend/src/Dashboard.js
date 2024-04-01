import QuestionRibbon from './components/questionRibbon';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import QuestionPage from './components/questionPage';
import { Navbar } from './components/navbar';
import { useState } from 'react';


function Dashboard(props) {

  const problems = props.problems;
  
  // Later, we may need to bucket the problems based on tag and store them somewhere before showing them here.

  return (
    <>
      <Navbar />

      <h2 className='problem-section'> Introductory Problems </h2>
      <div className="problem-list">
        {Object.entries(problems).map(([key, value]) => (
            <QuestionRibbon key={key} problem={value} />
        ))}
      </div>
          
    </>
  );
}

export default Dashboard;
