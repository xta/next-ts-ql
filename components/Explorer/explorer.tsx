import { useState, useEffect } from 'react';

import styles from './explorer.module.css'

export default function Explorer() {

    const [key, setKey] = useState('loading')
    const [response, setResponse] = useState('loading')

    const query = `
    {
      organization(login: "the-road-to-learn-react") {
        name
        url
      }
    }
  `

    const endpoint = 'https://api.github.com/graphql'

    // on load: get GH secret key from .env.local
    useEffect(() => {
        const secret = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN as string
        setKey(secret)

        if (key === '') return

        const fetchData = async () => {
            const data = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Authorization: `bearer ${secret}`,
                },
                body: JSON.stringify({
                    query: query
                })
            })

            const json = await data.json()
            setResponse(prettyJsonString(json))
        }

        fetchData()
            .catch(console.error)
    }, [])

    let keyMessageStyles = [styles.section]
    if (key === '') {
        keyMessageStyles.push(styles.keyMessageError)
    } else {
        keyMessageStyles.push(styles.keyMessageSuccess)
    }

    function prettyJsonString(json: object): string {
        return JSON.stringify(json, null, 2)
    }

    return (
        <>
            <div className={keyMessageStyles.join(' ')}>
                {key === '' ? 'Error: GH Key not found' : 'GH Key found.'}
            </div>

            <div className={styles.section}>
                <h3>Query</h3>
                <pre>
                    {query}
                </pre>
            </div>

            <div className={styles.section}>
                <h3>Result</h3>
                <pre>
                    {(response === 'loading') ? 'Loading...' : response}
                </pre>
            </div>
        </>
    )
}