import {react} from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionRibbon(props){

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    function openProblem(){
        const id = props.problem.id;

        const path = '/question-page/' + props.problem.id;
        routeChange(path);
    }


    const bgColor = (props.problem.isSolved ? "#90EE90" : "white");
    const textColor = "black";

    return (
        <div class="problem" onClick={openProblem} style={{backgroundColor: bgColor}}>
            <div class="problem-title" >Problem {props.problem.id}: {props.problem.title}</div>
            <div class="problem-description">{props.problem.problemStatement}</div>
        </div>
    );

}


export default QuestionRibbon;