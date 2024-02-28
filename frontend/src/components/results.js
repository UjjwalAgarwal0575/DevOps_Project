import { useState } from "react";

export const Results = (props) => {

    const [results, setResults] = useState(true);
    const [key, setKey] = useState(0);      // testcase number
    const [value, setValue] = useState(""); // user output of a testcase


    function handleClick(key, value) {
        setResults(false);
        setKey(key);
        setValue(value);
    }

    return (
        <div className="problem-statement">

            {(results)
                ?
                <div>
                    <h4>Results</h4>
                    {props.displayResult &&
                        <ul>
                             {props.displayResult &&
                                <ul> 
                                {/* key is 0 Failed, 1 Passed, etc */}
                                {props.resultArray.map(({ key, value }) => (
                                    <>
                                    <div onClick={() => handleClick(key[0], value)} className={key.substring(2)}>Testcase: {key[0]}</div>
                                    </>
                                ))}
                                </ul>
                            }
                        </ul>
                    }
                </div>
                :
                <div>
                    <button onClick={()=>{setResults(true)}}>Back</button>
                    <br></br>
                    <br></br>
                    <h5>TestCase: {key}</h5>
                    <div className="input-output" >
                        <div><strong>Input:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: props.testcases[key][0] }} />
                        <div><strong>Expected Output:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: props.testcases[key][1] }} />
                        <div><strong>Your Output:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: value }} />
                    </div>
                </div>
            }
        </div>
    );
}
