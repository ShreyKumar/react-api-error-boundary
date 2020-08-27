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

export default Data
