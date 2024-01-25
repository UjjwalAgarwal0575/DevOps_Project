export const Editor = (props) => {
    
    function handleCodeChange(e){
        props.setCode(e.target.value);
    }
    
    return(
        <>
            <textarea id="editor" onChange={handleCodeChange} className="editor">Your code goes here</textarea>
            {/* <button> Submit </button> */}
        </> 
    );
}