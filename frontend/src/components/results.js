export const Results = (props) => {
    return (
        <div className="problem-statement">
            <h2>Results</h2>
            {props.displayResult && 
                <ul>
                    {Object.entries(props.resultArray).map(([key, value]) => (
                        <li className={value}>{value}</li>    
                    ))}
                </ul>
            } 
        </div>
    );
}