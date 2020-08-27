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
        <div>
            <h1 style={{ textAlign: 'center' }}>Centralizing API calls with react-api-error-boundary</h1>
            <h2>Install the package</h2>
            <SyntaxHighlighter language="jsx" style={docco}>
                {`npm i react-api-error-boundary`}
            </SyntaxHighlighter>
            <p style={{textAlign: "center"}}>or</p>
            <SyntaxHighlighter language="jsx" style={docco}>
                {`yarn add react-api-error-boundary`}
            </SyntaxHighlighter>
            <h2>Sample use case</h2>
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

            <h2>Live Demo</h2>
            <ErrorBoundaryProvider loadingUI={LoadingUI} errorUI={ErrorUI} logError={(e) => console.log(e)}>
                <Data />
            </ErrorBoundaryProvider>
        </div>
    )
}

export default App
