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
  const userData = localStorage.getItem("userData");
  var isLoggedIn = false;
  var username = '';

  if (userData){
    isLoggedIn = true;
    username = JSON.parse(userData).username;
  }
  
  // Later, we may need to bucket the problems based on tag and store them somewhere before showing them here.

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={username}/>

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
