import React from 'react'

import { ErrorBoundaryProvider } from 'react-api-error-boundary'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Data from './Data'

import './App.css'

const App = () => {
    const LoadingUI = () => {
        return <h1>Loading</h1>
    }

    const ErrorUI = () => {
        return <h1>Error</h1>
    }

    return (
        <div className="app">
            <h1>Centralizing API calls on multiple page React apps</h1>
            <h2>Motivation</h2>
            <p>
                Usually, a lot of multiple page React apps tend to make calls to various different APIs.
                These calls are reliant on Promise based HTTP clients such as Axios that return Promises determining if the call is successful or not.
                On the user's side, we would want to show 3 seperate states:
            </p>
            <ol>
                <li>If the call is successful, we would change the UI in some way to signify that the call has succeeded</li>
                <li>If the call is in progress, we would want to show a Loading UI to signify to the user to not interact with the page yet</li>
                <li>If the call fails, we would want to show a fallback Error UI (i.e. a 404 or 500 page) and some error information for us to capture on an error logging service</li>
            </ol>
            <p>While we know that only #1 would be different for every page in our multiple page app, #2 and #3 would remain the same for every API call. Speaking in React terms, this would require unique loading and error state variables for every page, which also would end up making things very tedious for us. This is where react-api-error-boundary comes in to save the day</p>
            <h2>Live Demo</h2>
            <ErrorBoundaryProvider loadingUI={LoadingUI} errorUI={ErrorUI} logError={(e) => console.log(e)}>
                <div className="datacomp-container">
                    <Data />
                </div>
            </ErrorBoundaryProvider>
            <h2>Install the package</h2>
            <SyntaxHighlighter language="jsx" style={docco}>
                {`npm i react-api-error-boundary`}
            </SyntaxHighlighter>
            <p style={{textAlign: "center"}}>or</p>
            <SyntaxHighlighter language="jsx" style={docco}>
                {`yarn add react-api-error-boundary`}
            </SyntaxHighlighter>
            <h2>Usage</h2>
            <div className="use-case-container">
                <div className="code-box">
                    <p className="file-name">App.js</p>
                    <SyntaxHighlighter language="jsx" style={docco}>
                {`
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Data from './MyDataDependentComponent'
import { useErrorBoundary, ErrorBoundaryProvider } from 'react-api-error-boundary'
import ErrorUI from './MyErrorFallbackUI'
import LoadingUI from './MyLoadingFallbackUI'
import logErrorToService from './logErrorToService'

<ErrorBoundaryProvider
    loadingUI={LoadingUI}
    errorUI={ErrorUI}
    logError={(e) => logErrorToService(e)}
>
    <Data />
    {/* ...More routes/components here */}
</ErrorBoundaryProvider>
                `}
                    </SyntaxHighlighter>
                </div>
                <div className="code-box">
                    <p className="file-name">MyDataDependentComponent.js</p>
                    <SyntaxHighlighter language="jsx" style={docco}>
{`
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useErrorBoundary } from 'react-api-error-boundary'

const Data = () => {
    const { makeApiRequest } = useErrorBoundary()
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const res = await makeApiRequest(Axios.get('https://reqres.in/api/users'))
            // use the data in whatever way neccessary
            // if an error gets thrown, then it would just return the error
            setData(JSON.stringify(res))
        }

        fetchData()
    }, [])

    return <code>{data}</code>
}
`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    )
}

export default App
