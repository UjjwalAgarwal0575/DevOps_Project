import {react} from 'react';
import { useNavigate } from 'react-router-dom';

function sliceProblemStatement(s){
    if (s.length <= 100) return s;
    
    return s.slice(0, 100) + "...";
}

function QuestionRibbon(props){

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    function openProblem(){
        const id = props.problem.questionId;

        const path = '/question-page/' + props.problem.questionId;
        routeChange(path);
    }


    const bgColor = (props.problem.isSolved ? "#90EE90" : "white");
    const textColor = "black";

    return (
        <div className="problem" onClick={openProblem} style={{backgroundColor: bgColor}}>
             <div className="question-ribbon-header">
              <h4 className="question-ribbon-id"># {props.problem.questionId}</h4>
              <h4 className="question-ribbon-title">{props.problem.title}</h4>
            </div>
            {/* <div className="problem-title" >{props.problem.title}</div> */}
            {/* <div className="problem-description">{sliceProblemStatement(props.problem.problemStatement)}</div> */}
        </div>
    );
}

export default QuestionRibbon;