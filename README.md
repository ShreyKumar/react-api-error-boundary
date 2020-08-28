# react-api-error-boundary

> An easy way to centralize API calls on data dependent components

[![NPM](https://img.shields.io/npm/v/react-api-error-boundary.svg)](https://www.npmjs.com/package/react-api-error-boundary) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-api-error-boundary
```
or
```bash
yarn add react-api-error-boundary
```

## Usage
In your `App.js`, initialize the Provider
```jsx
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
```
Then use the Context on your page
```jsx
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useErrorBoundary } from 'react-api-error-boundary'

const Data = () => {
    const { makeApiRequest } = useErrorBoundary()
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const res = await makeApiRequest(Axios.get('https://reqres.in/api/users'))

            setData(JSON.stringify(res))
        }

        fetchData()
    }, [])

    return <code>{data}</code>
}
```

## License
MIT © [shreykumar](https://github.com/shreykumar)
