import { useState, useEffect } from 'react';
import { ApiGet } from '../../models/github'

import styles from './explorer.module.css'

export default function Explorer() {

    const [key, setKey] = useState('loading')
    const [response, setResponse] = useState('loading')

    const query = `query { 
    viewer { 
        login
    }
}`

    // on load: get GH secret key from .env.local
    useEffect(() => {
        const secret = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN as string
        setKey(secret)
        if (key == 'loading') return

        const fetchData = async () => {
            const data = await ApiGet(query, '', key)
            const json = await data.json()
            setResponse(prettyJsonString(json))
        }

        fetchData()
            .catch(console.error)
    }, [key, response])

    let keyMessageStyle = ''
    if (key !== 'loading') {
        keyMessageStyle = styles.keyMessageSuccess
    }

    function prettyJsonString(json: object): string {
        return JSON.stringify(json, null, 2)
    }

    return (
        <>
            <div className={`${styles.section} ${keyMessageStyle}`}>
                {key === '' ? 'Error: GH Key not found' : 'GH Key found.'}
            </div>

            <div className={styles.section}>
                <h3>Query</h3>
                <pre className={styles.preWrap}>
                    {query}
                </pre>
            </div>

            <div className={styles.section}>
                <h3>Result</h3>
                <pre className={styles.preWrap}>
                    {(response === 'loading') ? 'Loading...' : response}
                </pre>
            </div>
        </>
    )
}