import { react, useEffect } from 'react';


function QuestionPage(props) {

    const problem = props.problem;

    function submitCode() {

    }


    return (

        <>
            <header>
                <h1>SpeedCoder</h1>
                <a href="#" class="profile-button">Profile</a>
            </header>
            <div class="problem-statement">

                <div class="problem-title">
                    <h3>Problem {problem.id}: {problem.title} </h3>
                </div>
                <br></br>
                <br></br>
                <div class="problem-description">
                    <p>{problem.problemStatement}</p>
                    <p>Constraints:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                        {/* {problem.constraints}</li> */}
                        {/* <li>Output: ...</li> */}
                    </ul>
                </div>
                <div class="input-output" >
                    <div><strong>Input:</strong></div>
                    <code dangerouslySetInnerHTML={{ __html: problem.examples.input }} />
                    <div><strong>Output:</strong></div>
                    <code dangerouslySetInnerHTML={{ __html: problem.examples.output }} />
                </div>

                {/* <input type="file"> Choose Your File </input> */}
                <button onClick={submitCode}>Submit</button>
            </div>
        </>

    );
}


export default QuestionPage;