import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a theme
import { Navbar } from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

const SubmittedCodeView = () => {
    useEffect(()=>{
        if (localStorage.getItem('userData') === null || location.state.data === null){
            routeChange("/auth");
        }
        // if (data === null) routeChange("/auth");
    });

    let navigate = useNavigate();
    const routeChange = (path, data) => {
        navigate(path, {state: {data}});
    }

    const location = useLocation();
    const data = location.state.data;

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    };

    return (
        <div>
            <Navbar />
            <div className='problem-list'>
            <div style={{ position: 'relative' }}>
                <FontAwesomeIcon
                    icon={faCopy}
                    color='white'
                    onClick={copyToClipboard}
                    style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                />
                {copied && <div style={{ position: 'absolute', top: '30px', right: '10px', background: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Copied!</div>}
                
                <SyntaxHighlighter language="java" style={tomorrow}>
                    {data.code}
                </SyntaxHighlighter>
            </div>
            </div>
        </div>
    );
}

export default SubmittedCodeView;