import { useState } from "react";

export const Results = (props) => {

    const [results, setResults] = useState(true);
    const [key, setKey] = useState(0);

    function handleClick(key) {
        setResults(false);
        setKey(key);
    }

    return (
        <div className="problem-statement">

            {(results)
                ?
                <div>
                    <h4>Results</h4>
                    {props.displayResult &&
                        <ul>
                            {Object.entries(props.resultArray).map(([key, value]) => (
                                <div onClick={() => handleClick(key)} className={value}>{value}</div>
                            ))}
                        </ul>
                    }
                </div>
                :
                <div>
                    <button onClick={()=>{setResults(true)}}>Back</button>
                    <br></br>
                    <br></br>
                    <h4>TestCase: {key}</h4>
                    <div className="input-output" >
                        <div><strong>Input:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: props.testcases[key][0] }} />
                        <div><strong>Output:</strong></div>
                        <code dangerouslySetInnerHTML={{ __html: props.testcases[key][1] }} />
                    </div>
                </div>
            }
        </div>
    );
}
