import { react } from 'react';


function QuestionPage(props) {

    const problem = props.problem;

    function submitCode() {
        
    }


    return (

        <div class="problem-statement">
            <div class="problem-title">Problem {problem.id}: {problem.title} </div>
            <div class="problem-description">
                <p>{problem.problemStatement}</p>
                <p>For example:</p>
                <ul>
                    <li>Input: ...</li>
                    <li>Output: ...</li>
                </ul>
            </div>
            <div class="input-output">
                <div><strong>Input:</strong></div>
                <code>4</code>
                <code>1 2 3 4</code>
                <div><strong>Output:</strong></div>
                <code>10</code>
            </div>

            {/* <input type="file"> Choose Your File </input> */}
            <button onClick={submitCode}>Submit</button>
        </div>
    );
}


export default QuestionPage;