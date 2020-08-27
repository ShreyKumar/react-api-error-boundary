import React, { createContext, useState, useContext } from 'react'

export const ErrorBoundaryContext = createContext({
    makeApiRequest: () => {},
    loading: false,
    setLoading: () => {},
    error: false,
    setError: () => {}
})

export const useErrorBoundary = () => {
    return useContext(ErrorBoundaryContext)
}

export const ErrorBoundaryProvider = ({
    children,
    logError,
    errorUI: ErrorUI,
    loadingUI: LoadingUI
}) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const makeApiRequest = async (apiPromise) => {
        try {
            setLoading(true)
            const res = await apiPromise
            setLoading(false)
            return res
        } catch (e) {
            logError(e)
            setLoading(false)
            setError(true)
            return e
        }
    }

    return (
        <ErrorBoundaryContext.Provider
            value={{ makeApiRequest, error, loading, setError, setLoading, logError, makeApiRequest }}
        >
            <div style={{ display: loading ? 'block' : 'none' }}>
                <LoadingUI />
            </div>

            <div style={{ display: error ? 'block' : 'none' }}>
                <ErrorUI />
            </div>

            <div style={{ display: !error && !loading ? 'block' : 'none' }}>
                {children}
            </div>
        </ErrorBoundaryContext.Provider>
    )
}

